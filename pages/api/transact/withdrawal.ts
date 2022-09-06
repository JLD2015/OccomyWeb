import admin from "../../../firebase/firebase";
import { APNsNotification } from "../../../functions/sendNotification";
import { NextApiRequest, NextApiResponse } from "next";

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

  if (!body.amount) {
    return response
      .status(400)
      .json({ status: "Please provide a valid amount" });
  }
  const amount = body.amount;

  // Second we validate the authorization token
  admin
    .auth()
    .verifyIdToken(authorization)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      const withdrawalFees = 5;

      // Third we run the transaction
      admin.firestore().runTransaction(async (transaction) => {
        // 1. Read operations
        const userDoc = await transaction.get(
          admin.firestore().collection("users").doc(uid)
        );
        const userData = userDoc.data();

        // Fourth we check whether the user has sufficient funds for a withdrawal
        if (Number(userData.balance) < Number(amount) + withdrawalFees) {
          response.status(400).json({ status: "Insufficient funds" });
          return;
        }

        // Fifth we update the user's balance and fees
        transaction.update(admin.firestore().collection("users").doc(uid), {
          balance: userData.balance - Number(amount) - withdrawalFees,
        });

        // Sixth we record the withdrawal in the withdrawals collection
        transaction.set(admin.firestore().collection("withdrawals").doc(), {
          amount: Number(amount),
          date: admin.firestore.FieldValue.serverTimestamp(),
          processed: false,
          userID: uid,
        });

        // 6. Send notification to the user
        for (const token of userData.notificationTokens) {
          APNsNotification(
            token,
            "Withdrawal",
            `Withdrew R${Number(amount).toFixed(2)}`
          );
        }

        // Seventh we trigger completion
        response.status(200).json({ status: "Success" });
      });
    });
}
