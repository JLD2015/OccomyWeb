import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need the post data
  const body = request.body;

  if (!body.jid) {
    return response
      .status(400)
      .json({ status: "Please provide a valid jid to delete" });
  }
  const jid = body.jid;

  const data = JSON.stringify({
    user: jid,
    host: "xmpp.occomy.com",
  });

  const endpoint = "https://xmpp.occomy.com:5443/api/unregister";
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
    body: data,
  };

  const postResponse = await fetch(endpoint, options);
  const postResult = await postResponse.json();
  console.log(postResult);

  response.status(200).json({ status: "Success" });
}
