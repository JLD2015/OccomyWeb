import admin from "../../../firebase/firebase";
import { client, xml } from "@xmpp/client";
const crypto = require("crypto");
import formidable from "formidable";
import { getStorage } from "firebase-admin/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";
import uuid from "uuid-v4";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function updateProfileDetails(
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

    if (!fields.name) {
      return response
        .status(400)
        .json({ status: "Please provide a valid name" });
    }
    const name = fields.name;

    if (!fields.phone) {
      return response
        .status(400)
        .json({ status: "Please provide a valid phone number" });
    }
    const phone = fields.phone;

    if (!fields.jid) {
      return response
        .status(400)
        .json({ status: "Please provide a valid jid" });
    }
    const jidfull = fields.jid;
    const jid = fields.jid.split("@")[0];

    if (!fields.jidpassword) {
      return response
        .status(400)
        .json({ status: "Please provide a valid jid password" });
    }
    const jidpassword = fields.jidpassword;

    // First we validate the authorization token
    admin
      .auth()
      .verifyIdToken(authorization)
      .then((decodedToken) => {
        const uid = decodedToken.uid;

        // Second we start the transaction
        try {
          admin.firestore().runTransaction(async (transaction) => {
            // Upload the new profile picture
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
                // Construct download url
                const downloadUrl =
                  "https://firebasestorage.googleapis.com:443/v0/b/occomy.appspot.com/o/profilePictures%2F" +
                  uniqueIdentifier +
                  "?alt=media&token=" +
                  uniqueIdentifier;

                // 5. Update the user's details
                admin.firestore().collection("users").doc(uid).update({
                  name: name,
                  phoneNumber: phone,
                  profilePhotoUrl: downloadUrl,
                });

                // 6. Update the user's XMPP VCard
                const xmpp = client({
                  service: "xmpp://xmpp.occomy.com:5222",
                  username: jid,
                  password: jidpassword,
                });

                // Monitor when we go online
                xmpp.on("online", async (address) => {

                  // Get the base64 version of the image file
                  var bitmap = readFileSync(profilepicturepath);
                  var base64picture = Buffer.from(bitmap).toString("base64");

                  // Update the user's VCard once we are online
                  const iq = xml(
                    "iq",
                    { id: crypto.randomUUID(), type: "set" },
                    xml(
                      "vCard",
                      { xmlns: "vcard-temp" },
                      xml("FN", {}, name),
                      xml("JABBERID", {}, jidfull),
                      xml(
                        "PHOTO",
                        {},
                        xml("TYPE", {}, "image/jpeg"),
                        xml("BINVAL", {}, base64picture)
                      )
                    )
                  );
                  await xmpp.send(iq);
                  return response.status(200).json({ status: "success" });
                });

                // Fourth we start the XMPP connection
                xmpp.start().catch(console.error);
              });
          });
        } catch (e) {
          return response.status(200).json({ status: "Failed" });
        }
      })
      .catch(() => {
        return response.status(200).json({ status: "Invalid token" });
      });
  });
}
