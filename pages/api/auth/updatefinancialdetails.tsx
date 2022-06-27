import admin from "../../../firebase/firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default function updateFinancialDetails(
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

  if (!body.bankname) {
    return response
      .status(400)
      .json({ status: "Please provide a valid bank name" });
  }
  const bankname = body.bankname;

  if (!body.bankaccountnumber) {
    return response
      .status(400)
      .json({ status: "Please provide a valid bank account number" });
  }
  const bankaccountnumber = body.bankaccountnumber;

  // First we validate the authorization token
  admin
    .auth()
    .verifyIdToken(authorization)
    .then((decodedToken) => {
      const uid = decodedToken.uid;

      // Second we update the user's financial details
      admin
        .firestore()
        .collection("users")
        .doc(uid)
        .update({ bankAccountNumber: bankaccountnumber, bankName: bankname });

      // Third we trigger the callback
      return response.status(200).json({ status: "Success" });
    })
    .catch(() => {
      return response.status(400).json({ status: "Invalid token" });
    });
}
