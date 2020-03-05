/**
 * Utility function to post messages with no-cors
 * @function post
 * @param {string} url
 * @param {object} data
 * @returns Response object from fetch if successful
 */
async function post(url, data) {
  try {
    // Default options are marked with *
    return await fetch(url, {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: { "Content-Type": "application/json" },
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  } catch (error) {
    console.error("Network request Failed");
    return false;
  }
}

module.exports = post;
