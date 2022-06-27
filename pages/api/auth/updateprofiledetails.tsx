import admin from "../../../firebase/firebase";
import formidable from "formidable";
import { getStorage } from "firebase-admin/storage";
import { NextApiRequest, NextApiResponse } from "next";
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

    // First we validate the authorization token

    setTimeout(() => {
      console.log("World!");
    }, 10000);

    admin
      .auth()
      .verifyIdToken(authorization)
      .then((decodedToken) => {
        const uid = decodedToken.uid;

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
            console.log("Uploaded profile picture");
          });

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

        // 6. Trigger completion
        return response.status(200).json({ status: "Success" });
      })
      .catch(() => {
        return response.status(200).json({ status: "Invalid token" });
      });
  });
}
