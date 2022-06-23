import admin from "firebase-admin";
const firebaseConfig = require("./firebaseConfig.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
  console.log("Firebase initialized.");
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;
