import admin from "../../../firebase/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import randomIDGenerator from "../../../functions/randomIDGenerator";
import uuid from "uuid-v4";
import { APNsNotification } from "../../../functions/sendNotification";

export default function processWithdrawal(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const headers = request.headers;

  if (!headers.authorization) {
    return response
      .status(400)
      .json({ status: "Please provide authorization credentials" });
  }
  const authorization = headers.authorization;

  const body = request.body;

  if (!body.recipientid) {
    return response
      .status(400)
      .json({ status: "Please provide a valid recipientID" });
  }
  const recipientid = body.recipientid;

  if (!body.amount) {
    return response
      .status(400)
      .json({ status: "Please provide a valid amount" });
  }
  const amount = body.amount;

  // Make sure the amount is a number
  if (isNaN(amount)) {
    return response
      .status(400)
      .json({ status: "Please provide a valid amount" });
  }

  if (!body.latitude) {
    return response.status(400).json({ status: "Please provide a latitude" });
  }
  const latitude = body.latitude;

  if (!body.longitude) {
    return response.status(400).json({ status: "Please provide a longitude" });
  }
  const longitude = body.longitude;

  // First we verify who the user is
  admin
    .auth()
    .verifyIdToken(authorization)
    .then((decodedToken) => {
      const uid = decodedToken.uid;

      // Second we start a transaction
      try {
        admin.firestore().runTransaction(async (transaction) => {
          // 1. Read operations
          const recipientDoc = await transaction.get(
            admin.firestore().collection("users").doc(recipientid)
          );
          const recipientData = recipientDoc.data();

          const senderDoc = await transaction.get(
            admin.firestore().collection("users").doc(uid)
          );
          const senderData = senderDoc.data();

          // 2. Write operations

          // Make sure customer isn't transacting with himself
          if (recipientDoc.id == senderDoc.id) {
            return response
              .status(400)
              .json({ status: "Cannot transact with yourself" });
          }

          // Generate transaction ID
          var uniqueID = randomIDGenerator(8);
          const docRef = admin
            .firestore()
            .collection("transactions")
            .doc("transactionIDs");
          const doc = await docRef.get();

          if (!doc.exists) {
            // If the document doesn't exist we need to create it
            const data = {
              transactionIDs: [uniqueID],
            };
            await admin
              .firestore()
              .collection("transactions")
              .doc("transactionIDs")
              .set(data);
          } else {
            // If the document does exist we just add the unique transaction ID
            const existingIDs = doc.data()["transactionIDs"];
            while (existingIDs.includes(uniqueID)) {
              uniqueID = randomIDGenerator(8);
            }
            await docRef.update({
              transactionIDs: admin.firestore.FieldValue.arrayUnion(uniqueID),
            });
          }

          // Update necesary data
          if (senderData.balance >= Number(amount)) {
            // Recipient values
            transaction.update(
              admin.firestore().collection("users").doc(recipientid),
              {
                balance: recipientData.balance + Number(amount),
              }
            );

            // Sender values
            transaction.update(admin.firestore().collection("users").doc(uid), {
              balance: senderData.balance - Number(amount),
            });

            // Transaction Values
            transaction.set(
              admin.firestore().collection("transactions").doc(),
              {
                amount: Number(amount),
                merchantID: recipientid,
                merchantName: recipientData.name,
                merchantProfilePhoto: recipientData.profilePhotoUrl,
                transactionID: uniqueID,
                status: "approved",
                date: admin.firestore.FieldValue.serverTimestamp(),
                customerID: uid,
                customerName: senderData.name,
                customerProfilePhoto: senderData.profilePhotoUrl,
                latitude: latitude,
                longitude: longitude,
              }
            );

            // Send notifications to sender and receiver
            const senderTokens = senderData.APNs;
            for (const token in senderTokens) {
              APNsNotification(
                senderTokens[token],
                "Made Payment",
                `Paid R${Number(amount).toFixed(2)} to ${recipientData.name}`
              );
            }

            const receiverTokens = recipientData.APNs;
            for (const token in receiverTokens) {
              APNsNotification(
                receiverTokens[token],
                "Received Payment",
                `Received R${Number(amount).toFixed(2)} from ${senderData.name}`
              );
            }

            response.status(200).json({ status: "Success" });

            // Still need to record an actual chat message
          } else {
            transaction.update(
              admin.firestore().collection("transactions").doc(),
              {
                amount: Number(amount),
                merchantID: recipientid,
                merchantName: recipientData.name,
                merchantProfilePhoto: recipientData.profilePhotoUrl,
                transactionID: uniqueID,
                status: "declined",
                date: admin.firestore.FieldValue.serverTimestamp(),
                customerID: uid,
                customerName: senderData.name,
                customerProfilePhoto: senderData.profilePhotoUrl,
                latitude: latitude,
                longitude: longitude,
              }
            );
            response.status(400).json({ status: "Failed" });
            return;
          }
        });
      } catch (e) {
        console.log("Transaction failed:", e);
        response.status(400).json({ status: "Failed" });
      }
    })
    .catch(() => {
      response.status(400).json({ status: "Invalid token" });
    });
}