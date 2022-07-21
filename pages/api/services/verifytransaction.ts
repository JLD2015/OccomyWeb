import admin from "../../../firebase/firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const body = request.body;

  if (!body.transactionid) {
    return response
      .status(400)
      .json({ status: "Please provide a transactionid" });
  }
  const transactionid = body.transactionid;

  // Second we need to retrieve the transaction from firestore
  admin
    .firestore()
    .collection("transactions")
    .doc(transactionid)
    .get()
    .then(async (doc) => {
      const data = doc.data();

      if (typeof data === "undefined") {
        return response
          .status(400)
          .json({ status: "Transaction does not exist" });
      }

      // Third we need to check the status of the transaction
      return response.status(200).json({ status: data.status });
    })
    .catch((error) => {
      return response.status(400).json({ status: error });
    });
}
