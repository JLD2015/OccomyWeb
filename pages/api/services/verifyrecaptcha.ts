import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const body = request.body;

  if (!body.token) {
    return response
      .status(400)
      .json({ status: "Please provide a valid recipientID" });
  }
  const token = body.token;

  // Second we verify the reCAPTCHA token
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${token}`;
  try {
    const reCAPTCHAResponse = await fetch(verifyUrl, { method: "POST" });
    const reCAPTCHAJSON = await reCAPTCHAResponse.json();

    if (reCAPTCHAJSON.score >= 0.9) {
      return response.status(200).json({ status: "success" });
    } else {
      return response.status(200).json({ status: "failed" });
    }
  } catch (err) {
    console.log(err);
    response.status(200).json({ status: "failed" });
  }
}
