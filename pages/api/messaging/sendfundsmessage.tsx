import admin from "../../../firebase/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import randomIDGenerator from "../../../functions/randomIDGenerator";
import uuid from "uuid-v4";
import {
  addNotification,
  sendNotification,
} from "../../../functions/sendNotification";

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

            // Upload the message to the server
            const messageIdentifier = uuid();
            transaction.set(
              admin
                .firestore()
                .collection("newMessages")
                .doc(messageIdentifier),
              {
                date: admin.firestore.FieldValue.serverTimestamp(),
                fundsTransfer: true,
                message: `R${Number(amount).toFixed(2)}`,
                read: false,
                received: false,
                receiverID: recipientid,
                senderID: uid,
                senderName: senderData.name,
                senderProfilePictureUrl: senderData.profilePhotoUrl,
              }
            );

            // Send notifications to everybody

            // Recipient
            for (const token of recipientData.notificationTokens) {
              sendNotification(
                token,
                "Received Payment",
                `Received payment of R${Number(amount).toFixed(2)} from ${
                  senderData.name
                }`,
                function (status) {
                  console.log(status);
                }
              );
            }

            addNotification(
              recipientDoc.id,
              `Received: Received payment of R${Number(amount).toFixed(
                2
              )} from ${senderData.name}`
            );

            // Sender
            for (const token of senderData.notificationTokens) {
              sendNotification(
                token,
                "Made Payment",
                `Made payment of R${Number(amount).toFixed(2)} to ${
                  recipientData.name
                }`,
                function (status) {
                  console.log(status);
                }
              );
            }

            addNotification(
              senderDoc.id,
              `Paid: Made payment of R${Number(amount).toFixed(2)} to ${
                recipientData.name
              }`
            );

            response
              .status(200)
              .json({ status: "Success", messageID: messageIdentifier });

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
    .catch((error) => {
      response.status(400).json({ status: "Invalid token" });
    });
}
