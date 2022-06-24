import admin from "../../../firebase/firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function DeleteAccount(
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

  // Second we validate the authorization token
  admin
    .auth()
    .verifyIdToken(authorization)
    .then(async (decodedToken) => {
      const uid = decodedToken.uid;

      // Third we get the details for the user
      const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .get();
      const userData = userDoc.data();

      // Fourth we need to make sure the user doesn't have a balance
      if (userData.balance != 0) {
        return response
          .status(400)
          .json({ status: "Cannot delete users with a balance" });
      }

      // Fifth we record the contact details for the user
      const data = {
        date: admin.firestore.FieldValue.serverTimestamp(),
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      };
      admin
        .firestore()
        .collection("deletedAccounts")
        .doc(uid)
        .set(data)
        .then(async () => {
          // 4. Remove the user's depositID
          admin
            .firestore()
            .collection("users")
            .doc("depositIDs")
            .update({
              depositIDs: admin.firestore.FieldValue.arrayRemove(
                userData.depositID
              ),
            });

          // 5. Delete the user's profile in the users collection
          admin.firestore().collection("users").doc(uid).delete();

          // 6. Delete the user under the authorization section
          admin.auth().deleteUser(uid);

          // 7. Send email to user
          const data = {
            email: userData.email,
          };
          const JSONdata = JSON.stringify(data);

          const endpoint =
            "https://www.occomy.com/api/email/sendaccountdeletionemail";
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSONdata,
          };

          const res = await fetch(endpoint, options);
          const result = await res.json();

          if (result.status === "Success") {
            return response.status(200).json({ status: "Success" });
          } else {
            return response
              .status(400)
              .json({ status: "Could not send account deletion email" });
          }
        });
    })
    .catch((error) => {
      return response.status(400).json({ status: "Invalid token" });
    });
}
