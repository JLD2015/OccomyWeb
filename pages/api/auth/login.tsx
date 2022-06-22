import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Get the form details
  const body = req.body;

  // Get the email
  if (!body.email) {
    return res
      .status(400)
      .json({ status: "Please provide a valid email address" });
  }
  const email = body.email;

  // Get the password
  if (!body.password) {
    return res.status(400).json({ status: "Please provide a valid password" });
  }
  const password = body.password;

  // Log the user in
  res.status(200).json({ status: "Good request" });
};
