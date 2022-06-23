// Imports
import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

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

export default async function sendContactEmail(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const body = request.body;

  if (!body.oobCode) {
    return response.status(400).json({ status: "Please provide oobCode" });
  }
  const oobCode = body.oobCode;

  if (!body.password) {
    return response.status(400).json({ status: "Please provide a password" });
  }
  const password = body.password;

  // Second we verify the oobCode
  verifyPasswordResetCode(auth, oobCode)
    .then(() => {
      // Third we reset the user's password
      confirmPasswordReset(auth, oobCode, password)
        .then(() => {
          response.status(200).json({ status: "Success" });
        })
        .catch(() => {
          // If password reset doesnt work
          response.status(400).json({ status: "Could not reset password" });
        });
    })
    .catch(() => {
      // If the oobCode is invalid
      console.log("Invalid OOB Code");
      response.status(400).json({ status: "Invalid oobCode" });
    });
}
