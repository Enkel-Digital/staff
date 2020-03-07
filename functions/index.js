"use strict";

const sgMail = require("@sendgrid/mail");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

// Initialize admin use of FB
admin.initializeApp(functions.config().firebase);
// Initialize sendgrid mail with the API key
sgMail.setApiKey(functions.config().sendgrid_api.key);

exports.signUpRequest = functions.https.onRequest(async (req, res) => {
  // Parse the body string into JSON
  const data = JSON.parse(req.body);

  try {
    // Call the database to insert the new user, but the allowed field put as false first
    let db = admin.firestore();
    let docRef = db.collection("users").doc(data.email);

    // Wait for store to DB, so if DB failed, we can notify user to retry later.
    await docRef.set({
      email: data.email,
      name: data.name,
      accountStatus: "PENDING APPROVAL",
      accountType: "USER"
    });
  } catch (error) {
    // Send the admins a email to notify if DB update failed
    await sgMail.send({
      to: "admin@enkeldigital.com",
      from: "staff.app@enkeldigital.com",
      subject: `New account request failed`,
      html:
        `A new account for staff app/portal was requested on<br />${new Date()}` +
        `<br />Email: ${data.email}<br />Name: ${data.name}<br />` +
        "<br />Storing user data to firestore database failed. Please resolve manually.<br />" +
        "Error encountered is:<br />" +
        error.message
    });
    return res.status(500).json({ success: false, error: error.message });
  }

  // Send the admins a email to notify if DB update is a success
  await sgMail.send({
    to: "admin@enkeldigital.com",
    from: "staff.app@enkeldigital.com",
    subject: `New account requested by: ${data.email}`,
    html:
      `New account for staff app/portal requested on<br />${new Date()}` +
      `<br />Email: ${data.email}<br />Name: ${data.name}<br />` +
      "Check on the app for more details and to approve request."
  });

  return res.status(201).json({ success: true });
});
