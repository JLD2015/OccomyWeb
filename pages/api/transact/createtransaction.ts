import admin from "../../../firebase/firebase";
import { decrypt } from "../../../functions/cryptography";
import { NextApiRequest, NextApiResponse } from "next";
import randomIDGenerator from "../../../functions/randomIDGenerator";

export default async function createTransaction(
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
  const apikey = headers.authorization;

  const body = request.body;

  if (!body.amount) {
    return response
      .status(400)
      .json({ status: "Please provide a valid amount" });
  }
  var amount = body.amount;

  if (isNaN(amount)) {
    return response
      .status(400)
      .json({ status: "Please provide a valid amount" });
  }

  amount = Number(amount).toFixed(2);

  if (!body.description) {
    return response
      .status(400)
      .json({ status: "Please provide a valid description" });
  }
  const description = body.description;

  // Second we decode the API key
  var uid = null;
  try {
    uid = decrypt(apikey);
  } catch {
    return response.status(400).json({ status: "Invalid API key" });
  }

  // Retrieve the merchant's profile
  const merchantDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .get();
  if (!merchantDoc.exists) {
    return response.status(400).json({ status: "Invalid API key" });
  }

  const merchantID = merchantDoc.id;
  const merchantData = merchantDoc.data();

  const merchantName = merchantData.name;
  const merchantPhotoURL = merchantData.profilePhotoUrl;

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

    // Create transaction on firestore
    const data = {
      amount: parseFloat(amount),
      description: description,
      merchantID: merchantID,
      merchantName: merchantName,
      merchantProfilePhoto: merchantPhotoURL,
      transactionID: uniqueID,
      status: "pending",
      date: admin.firestore.FieldValue.serverTimestamp(),
      customerID: " ",
      customerName: " ",
      customerProfilePhoto: " ",
    };

    const res2 = await admin.firestore().collection("transactions").add(data);

    // Respond with the transaction details
    return response.status(200).json({
      status: "Success",
      documentID: res2.id,
      transactionID: uniqueID,
      merchantProfilePhoto: merchantPhotoURL,
      merchantName: merchantName,
    });
  }
}
