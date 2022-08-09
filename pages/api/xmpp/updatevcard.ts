import { NextApiRequest, NextApiResponse } from "next";
const crypto = require("crypto");
import { client, xml, jid } from "@xmpp/client";
const debug = require("@xmpp/debug");

export default function approveTransaction(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the post details
  const body = request.body;

  if (!body.jid) {
    return response.status(400).json({ status: "Please provide a valid jid" });
  }
  const jidfull = body.jid;
  const jid = body.jid.split("@")[0];

  if (!body.jidpassword) {
    return response
      .status(400)
      .json({ status: "Please provide a valid jid password" });
  }
  const jidpassword = body.jidpassword;

  if (!body.name) {
    return response.status(400).json({ status: "Please provide a valid name" });
  }
  const name = body.name;

  // Create XMPP client
  const xmpp = client({
    service: "xmpp://xmpp.occomy.com:5222",
    username: jid,
    password: jidpassword,
  });

  // Monitor when we go online
  xmpp.on("online", async (address) => {
    console.log("Stream: Online");

    // Update the user's VCard once we are online
    const iq = xml(
      "iq",
      { id: crypto.randomUUID(), type: "set" },
      xml(
        "vCard",
        { xmlns: "vcard-temp" },
        xml("FN", {}, name),
        xml("JABBERID", {}, jidfull)
      )
    );
    await xmpp.send(iq);

    // Stop the connection
    xmpp.stop();

    // Return completion to browser
    return response.status(200).json({
      status: "success",
    });
  });

  xmpp.start().catch(console.error);
}
