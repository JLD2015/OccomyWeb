import admin from "../../../firebase/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import uuid from "uuid-v4";
import { sendNotification } from "../../../functions/sendNotification";

export default function sendMessage(
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

  if (!body.receiverid) {
    return response.status(400).json({ status: "Please provide a receiverID" });
  }
  const receiverid = body.receiverid;

  if (!body.message) {
    return response.status(400).json({ status: "Please provide a message" });
  }
  const message = body.message;

  if (!body.fundstransfer) {
    return response
      .status(400)
      .json({ status: "Please provide a funds transfer status" });
  }
  const fundstransfer = body.fundstransfer;

  if (!body.sendername) {
    return response.status(400).json({
      status: "Please provide a name for whoever is sending the message",
    });
  }
  const sendername = body.sendername;

  if (!body.senderprofilepictureurl) {
    return response
      .status(400)
      .json({ status: "Please provide a url for the senders profile picture" });
  }
  const senderprofilepictureurl = body.senderprofilepictureurl;

  // 2. Identify the user
  admin
    .auth()
    .verifyIdToken(authorization)
    .then((decodedToken) => {
      const uid = decodedToken.uid;

      //3. Run the transaction
      try {
        admin.firestore().runTransaction(async (transaction) => {
          // 3. Read the necessary details
          const receiverDoc = await transaction.get(
            admin.firestore().collection("users").doc(receiverid)
          );
          const receiverData = receiverDoc.data();

          // 4. Upload the message to the server
          const messageIdentifier = uuid();
          var parsedFundsTransfer = fundstransfer === "true";
          transaction.set(
            admin.firestore().collection("newMessages").doc(messageIdentifier),
            {
              date: admin.firestore.FieldValue.serverTimestamp(),
              fundsTransfer: parsedFundsTransfer,
              message: message,
              read: false,
              received: false,
              receiverID: receiverid,
              senderID: uid,
              senderName: sendername,
              senderProfilePictureUrl: senderprofilepictureurl,
            }
          );

          // 5. Send notifications to the receiver's devices
          for (const token of receiverData.notificationTokens) {
            sendNotification(token, sendername, message, function (status) {
              console.log(status);
            });
          }

          //6. Success callback
          response
            .status(200)
            .json({ status: "Success", messageID: messageIdentifier });
        });
      } catch (e) {
        return response.status(400).json({ status: "Failed" });
      }
    })
    .catch(() => {
      return response.status(400).json({ status: "Invalid token" });
    });
}
