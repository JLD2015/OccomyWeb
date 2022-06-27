import admin from "../../../firebase/firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default function declineTransaction(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const headers = request.headers;

  if (!headers.authorization) {
    return response
      .status(400)
      .json({ status: "Please provide a valid API key" });
  }
  const authorization = headers.authorization;

  const body = request.body;

  if (!body.transactionid) {
    return response
      .status(400)
      .json({ status: "Please provide a valid transactionID" });
  }
  const transactionid = body.transactionid;

  // Verify the token
  admin
    .auth()
    .verifyIdToken(authorization)
    .then(() => {
      // Run transaction
      try {
        admin.firestore().runTransaction(async (transaction) => {
          transaction.update(
            admin.firestore().collection("transactions").doc(transactionid),
            {
              status: "declined",
              date: admin.firestore.FieldValue.serverTimestamp(),
            }
          );

          return response.status(200).json({
            status: "Success",
          });
        });
      } catch (e) {
        return response.status(400).json({ status: "Failed" });
      }
    })
    .catch(() => {
      return response.status(400).json({ status: "Failed" });
    });
}
