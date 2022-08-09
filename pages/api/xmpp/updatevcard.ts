import { NextApiRequest, NextApiResponse } from "next";
const crypto = require("crypto");
import { client, xml } from "@xmpp/client";
import formidable from "formidable";
import { readFileSync } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function approveTransaction(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // First we need to get the POST details
  const form = new formidable.IncomingForm();
  form.parse(request, async (err, fields, files) => {
    if (err) {
      return response.status(400).json({ status: "Something went wrong" });
    }

    if (!files.picture) {
      return response
        .status(400)
        .json({ status: "Please provide a profile picture" });
    }
    const picturepath = files.picture.filepath;

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

    if (!fields.name) {
      return response
        .status(400)
        .json({ status: "Please provide a valid name" });
    }
    const name = fields.name;

    // Second we create the XMPP client
    const xmpp = client({
      service: "xmpp://xmpp.occomy.com:5222",
      username: jid,
      password: jidpassword,
    });

    // Third we update the user's vCard when the XMPP connection goes live
    // Monitor when we go online
    xmpp.on("online", async (address) => {
      console.log("Stream: Online");

      // Get the base64 version of the image file
      var bitmap = readFileSync(picturepath);
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

      // Stop the connection
      xmpp.stop();

      // Return completion to browser
      return response.status(200).json({
        status: "success",
      });
    });

    // Fourth we start the XMPP connection
    xmpp.start().catch(console.error);
  });
}
