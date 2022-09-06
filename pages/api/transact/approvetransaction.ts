import admin from "../../../firebase/firebase";
import { APNsNotification } from "../../../functions/sendNotification";
import { NextApiRequest, NextApiResponse } from "next";

export default function approveTransaction(
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

  if (!body.transactionid) {
    return response
      .status(400)
      .json({ status: "Please provide a valid transactionID" });
  }
  const transactionid = body.transactionid;

  if (!body.latitude) {
    return response.status(400).json({ status: "Please provide a latitude" });
  }
  const latitude = body.latitude;

  if (!body.longitude) {
    return response.status(400).json({ status: "Please provide a longitude" });
  }
  const longitude = body.longitude;

  // Second we verify the token
  admin
    .auth()
    .verifyIdToken(authorization)
    .then((decodedToken) => {
      const uid = decodedToken.uid;

      // Third we run the transaction
      try {
        admin
          .firestore()
          .runTransaction(async (transaction) => {
            // 1. Read operations
            const transactionDoc = await transaction.get(
              admin.firestore().collection("transactions").doc(transactionid)
            );
            const transactionData = transactionDoc.data();

            if (!transactionData) {
              return response.status(400).json({
                status: "Failed",
              });
            }

            const merchantDoc = await transaction.get(
              admin
                .firestore()
                .collection("users")
                .doc(transactionData.merchantID)
            );
            const merchantData = merchantDoc.data();

            const customerDoc = await transaction.get(
              admin.firestore().collection("users").doc(uid)
            );
            const customerData = customerDoc.data();

            // 2. Write operations

            // Make sure customer isn't transacting with himself
            if (merchantDoc.id == customerDoc.id) {
              return response
                .status(400)
                .json({ status: "Cannot transact with yourself" });
            }

            // Make sure the transaction hasn't already been processed
            if (transactionData.status != "pending") {
              return response
                .status(400)
                .json({ status: "Transaction already processed" });
            }

            // Update necesary data
            if (customerData.balance >= transactionData.amount) {
              // Merchant values
              transaction.update(
                admin
                  .firestore()
                  .collection("users")
                  .doc(transactionData["merchantID"]),
                {
                  balance: merchantData.balance + transactionData.amount,
                }
              );

              // Customer values
              transaction.update(
                admin.firestore().collection("users").doc(uid),
                {
                  balance: customerData.balance - transactionData.amount,
                }
              );

              // Transaction Values
              transaction.update(
                admin.firestore().collection("transactions").doc(transactionid),
                {
                  customerName: customerData.name,
                  customerID: customerDoc.id,
                  customerProfilePhoto: customerData.profilePhotoUrl,
                  status: "approved",
                  date: admin.firestore.FieldValue.serverTimestamp(),
                  latitude: latitude,
                  longitude: longitude,
                }
              );

              // Send notifications to everybody

              // Merchant
              for (const token of merchantData.APNs) {
                APNsNotification(
                  token,
                  "Received Payment",
                  `Received R${transactionData.amount.toFixed(2)} from ${
                    customerData.name
                  }`
                );
              }

              // Customer
              for (const token of customerData.APNs) {
                APNsNotification(
                  token,
                  "Made Payment",
                  `Paid R${transactionData.amount.toFixed(2)} to ${
                    merchantData.name
                  }`
                );
              }

              return response.status(200).json({
                status: "Success",
              });
            } else {
              transaction.update(
                admin.firestore().collection("transactions").doc(transactionid),
                {
                  customerName: customerData.name,
                  customerID: customerDoc.id,
                  customerProfilePhoto: customerData.profilePhotoUrl,
                  status: "declined",
                  date: admin.firestore.FieldValue.serverTimestamp(),
                  latitude: latitude,
                  longitude: longitude,
                }
              );
              return response.status(400).json({
                status: "Failed",
              });
            }
          })
          .then((err) => {
            console.log(err);
            return response.status(400).json({
              status: "Failed",
            });
          });
      } catch (e) {
        console.log("Transaction failed:", e);
        return response.status(400).json({
          status: "Failed",
        });
      }
    })
    .catch(() => {
      return response.status(400).json({
        status: "Invalid token",
      });
    });
}
