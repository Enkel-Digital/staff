const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");

sgMail.setApiKey(functions.config().sendgrid_api.key);

exports.notifyDTM = functions.https.onRequest(async (req, res) => {
  // Parse the body string into JSON
  const data = JSON.parse(req.body);

  let html =
    "<h3>Hello DTMs</h3><br />There is a new faulty device reported by a staff!<hr />";

  // Add all data to the HTML mail body with newlines
  for (let [key, value] of Object.entries(data))
    html += `<br />${key}: ${value}`;

  // Construct the message object
  const msg = {
    to: "proops.dtm@enkeldigital.com",
    from: "proops.notification@enkeldigital.com",
    subject: `Faulty device reported on ${data.time}`,
    html
  };
  await sgMail.send(msg);

  res.status(200).end();
});
