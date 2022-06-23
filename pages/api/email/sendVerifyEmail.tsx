import admin from "../../../firebase/firebase";
import formData from "form-data";
import { createReadStream, readFileSync } from "fs";
import handlebars from "handlebars";
import Mailgun from "mailgun.js";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function sendVerifyEmail(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const body = request.body;

  if (!body.email) {
    return response
      .status(400)
      .json({ status: "Please provide an email address" });
  }
  const email = body.email;

  if (!body.name) {
    return response.status(400).json({ status: "Please provide a name" });
  }
  const name = body.name;

  // Second we generate an email verification link
  const actionCodeSettings = {
    url: "https://occomy.com/authentication",
  };

  admin
    .auth()
    .generateEmailVerificationLink(email, actionCodeSettings)
    .then((link) => {
      // Third we send the verification email to the user
      const mailgun = new Mailgun(formData);
      const client = mailgun.client({
        username: "api",
        key: "11cca92bdbb4cfa2bcac1dde2e6509b0-0be3b63b-70b4b404",
      });

      let emailTemplateSource = readFileSync(
        path.join(process.cwd(), "emailTemplates", "verifyEmail.hbs"),
        "utf8"
      );
      let template = handlebars.compile(emailTemplateSource);
      let htmlToSend = template({
        name: name,
        link: link,
        year: new Date().getFullYear(),
      });

      client.messages
        .create("occomy.com", {
          from: "noreply@occomy.com",
          to: email,
          subject: "Verify Email Address",
          html: htmlToSend,
          inline: {
            data: createReadStream(
              path.join(process.cwd(), "public", "images", "logo.png")
            ),
            filename: "logo.png",
          },
        })
        .then(() => {
          response.status(200).json({ status: "Success" });
        });
    })
    .catch(() => {
      response
        .status(200)
        .json({ status: "Could not send verification email" });
    });
}
