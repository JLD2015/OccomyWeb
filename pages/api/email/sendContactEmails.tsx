import formData from "form-data";
import fs from "fs";
import handlebars from "handlebars";
import Mailgun from "mailgun.js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function sendContactEmail(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const body = request.body;

  if (!body.token) {
    return response.status(400).json({ status: "reCAPTCHA failed" });
  }
  const token = body.token;

  if (!body.name) {
    return response.status(400).json({ status: "Please provide a valid name" });
  }
  const name = body.name;
  if (!body.email) {
    return response
      .status(400)
      .json({ status: "Please provide a valid email address" });
  }
  const email = body.email;
  const phone = body.phone;
  if (!body.message) {
    return response
      .status(400)
      .json({ status: "Please provide a valid message" });
  }
  const message = body.message;

  // Second we verify the reCAPTCHA token
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${token}`;
  try {
    const reCAPTCHAResponse = await fetch(verifyUrl, { method: "POST" });
    const reCAPTCHAJSON = await reCAPTCHAResponse.json();
    if (reCAPTCHAJSON.score >= 0.9) {
      // Third we send an email to support
      const mailgun = new Mailgun(formData);
      const client = mailgun.client({
        username: "api",
        key: "11cca92bdbb4cfa2bcac1dde2e6509b0-0be3b63b-70b4b404",
      });

      let emailTemplateSource = fs.readFileSync(
        "./emailTemplates/provideAssistance.hbs",
        "utf8"
      );
      let template = handlebars.compile(emailTemplateSource);
      let htmlToSend = template({
        name: name,
        email: email,
        phone: phone,
        message: message,
        year: new Date().getFullYear(),
      });

      client.messages
        .create("occomy.com", {
          from: "noreply@occomy.com",
          to: "support@occomy.com",
          subject: "Provide Assistance",
          html: htmlToSend,
          inline: {
            data: fs.createReadStream("public/images/logo.png"),
            filename: "logo.png",
          },
        })
        .then((res) => {
          console.log(res);
          // Fourth we send an email to the cutomer
          emailTemplateSource = fs.readFileSync(
            "./emailTemplates/receivedAssistanceRequest.hbs",
            "utf8"
          );
          template = handlebars.compile(emailTemplateSource);
          htmlToSend = template({ name: name, year: new Date().getFullYear() });

          client.messages
            .create("occomy.com", {
              from: "noreply@occomy.com",
              to: email,
              subject: "Request Received",
              html: htmlToSend,
              inline: {
                data: fs.createReadStream("public/images/logo.png"),
                filename: "logo.png",
              },
            })
            .then((res) => {
              console.log(res);
              response.status(200).json({ status: "Success" });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      response.status(200).json({ status: reCAPTCHAJSON.score });
    }
  } catch (e) {
    response.status(200).json({ status: "Failed" });
  }
}
