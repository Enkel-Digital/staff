"use strict";

const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");

sgMail.setApiKey(functions.config().sendgrid_api.key);

exports.signUpRequest = functions.https.onRequest(async (req, res) => {
  // Parse the body string into JSON
  const data = JSON.parse(req.body);

  // Call the database to insert the new user, but the allowed field put as false first

  // Send the admins a email
  const msg = {
    to: "admin@enkeldigital.com",
    from: "staff.app@enkeldigital.com",
    subject: `New account requested by: ${data.email}`,
    html:
      `New account for staff app/portal requested on<br />${new Date()}` +
      `<br />Email: ${data.email}<br />Name: ${data.name}<br />` +
      "Check on the app for more details and to approve request."
  };
  await sgMail.send(msg);

  res.status(201).json({ success: true });
});
