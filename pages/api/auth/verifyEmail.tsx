// Imports
import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { getAuth, applyActionCode } from "firebase/auth";

// Initialise firebase app -> Have to do this first
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAMGmuMTUZ34PxaNTQ3QG_Dh7JZxr5LQfY",
  authDomain: "occomy.firebaseapp.com",
  projectId: "occomy",
  storageBucket: "occomy.appspot.com",
  messagingSenderId: "791072514158",
  appId: "1:791072514158:web:52bff4cb9f02dad76c067f",
});

// Initialise services
const auth = getAuth(firebaseApp);

export default async function verifyEmail(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const body = request.body;

  if (!body.oobCode) {
    return response.status(400).json({ status: "Please provide oobCode" });
  }
  const oobCode = body.oobCode;

  // Second we validate the user's email address
  applyActionCode(auth, oobCode)
    .then(() => {
      response.status(200).json({ status: "Success" });
    })
    .catch(() => {
      response.status(400).json({ status: "Could not verify email" });
    });
}
