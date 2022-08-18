import crypto from "crypto";
import { encrypt } from "../../../functions/cryptography";
import { getStorage } from "firebase-admin/storage";
import admin from "../../../firebase/firebase";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import uuid from "uuid-v4";
import randomIDGenerator from "../../../functions/randomIDGenerator";
import { ShieldMoonOutlined } from "@mui/icons-material";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function CreateAccount(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const form = new formidable.IncomingForm();
  form.parse(request, async (err, fields, files) => {
    if (err) {
      return response.status(400).json({ status: "Something went wrong" });
    }

    if (!files.profilepicture) {
      return response
        .status(400)
        .json({ status: "Please provide a profile picture" });
    }
    const profilepicturepath = files.profilepicture.filepath;

    if (!fields.email) {
      return response
        .status(400)
        .json({ status: "Please provide a valid email" });
    }
    const email = fields.email;

    if (!fields.password) {
      return response
        .status(400)
        .json({ status: "Please provide a valid password" });
    }
    const password = fields.password;

    if (!fields.displayname) {
      return response
        .status(400)
        .json({ status: "Please provide a valid display name" });
    }
    const displayname = fields.displayname;

    if (!fields.phonenumber) {
      return response
        .status(400)
        .json({ status: "Please provide a valid phone number" });
    }
    const phonenumber = fields.phonenumber;

    // Second we register a new user
    admin
      .auth()
      .createUser({
        email: email,
        password: password,
        displayName: displayname,
      })
      .then((userRecord) => {
        console.log("Created account");
        // Third we upload the user's profile picture
        const uniqueIdentifier = uuid();
        getStorage()
          .bucket()
          .upload(profilepicturepath, {
            destination: "profilePictures/" + uniqueIdentifier,
            gzip: true,
            metadata: {
              metadata: {
                firebaseStorageDownloadTokens: uniqueIdentifier,
              },
              contentType: "image/jpg",
              cacheControl: "public, max-age=31536000",
            },
          })
          .then(() => {
            console.log("Uploaded profile picture");
          });

        // Construct download url
        const downloadUrl =
          "https://firebasestorage.googleapis.com:443/v0/b/occomy.appspot.com/o/profilePictures%2F" +
          uniqueIdentifier +
          "?alt=media&token=" +
          uniqueIdentifier;

        // We need to generate a unique ID
        var uniqueID = randomIDGenerator(8);

        const docRef = admin.firestore().collection("users").doc("depositIDs");
        docRef.get().then(async (doc) => {
          if (!doc.exists) {
            // If the document doesn't exist then we need to create it
            const data = {
              depositIDs: [uniqueID],
            };
            docRef.set(data);
          } else {
            // If the document does exist then we need to update it
            const existingIDs = doc.data().depositIDs;
            while (uniqueID in existingIDs) {
              uniqueID = randomIDGenerator(8);
            }

            docRef.update({
              depositIDs: admin.firestore.FieldValue.arrayUnion(uniqueID),
            });

            // We then need to generate a unique API
            const uniqueAPI = encrypt(userRecord.uid);

            // Third we need to create an XMPP account for the user
            const XMPPUsername = crypto.randomUUID();
            const XMPPPassword = crypto.randomUUID();

            const XMPPData = JSON.stringify({
              user: XMPPUsername,
              host: "xmpp.occomy.com",
              password: XMPPPassword,
            });

            const endpoint = "https://xmpp.occomy.com:5443/api/register";
            const authorization =
              `Basic ` +
              Buffer.from(
                `${process.env.XMPP_ADMIN_USERNAME}:${process.env.XMPP_ADMIN_PASSWORD}`
              ).toString(`base64`);
            const options = {
              method: "POST",
              headers: {
                Authorization: authorization,
                "Content-Type": "application/json",
              },
              body: XMPPData,
            };

            fetch(endpoint, options).then(async () => {
              console.log("Created XMPP account");

              // Fourth we upload all of the user's info
              const data = {
                apiKey: uniqueAPI,
                balance: 0,
                bankAccountNumber: "",
                bankName: "",
                compliant: true,
                depositID: uniqueID,
                email: email,
                jid: XMPPUsername,
                jidPassword: XMPPPassword,
                name: displayname,
                notifications: [],
                notificationTokens: [],
                phoneNumber: phonenumber,
                profilePhotoUrl: downloadUrl,
              };
              admin
                .firestore()
                .collection("users")
                .doc(userRecord.uid)
                .set(data)
                .then(async () => {
                  console.log("Added user info");

                  // Fifth we need to create a XMPP entry on Firestore for the user
                  const XMPPData = {
                    email: email,
                    jid: XMPPUsername,
                    name: displayname,
                    phoneNumber: phonenumber,
                  };

                  admin
                    .firestore()
                    .collection("XMPP")
                    .doc(userRecord.uid)
                    .set(XMPPData)
                    .then(async () => {
                      console.log("Added user XMPP record");

                      // Sixth we send a verify email to the user
                      const data = {
                        name: displayname,
                        email: email,
                      };
                      const JSONdata = JSON.stringify(data);

                      // Send emails
                      const endpoint =
                        "https://www.occomy.com/api/email/sendverifyemail";
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
                          .json({ status: "Could not send verify email" });
                      }
                    });
                });
            });
          }
        });
      })
      .catch((error) => {
        return response.status(400).json({ status: error });
      });
  });
}
