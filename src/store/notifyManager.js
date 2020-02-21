async function notifyManager(url, data) {
  try {
    // Default options are marked with *
    await fetch(url, {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to notify DTM of faulty device.");
    return false;
  }
}

module.exports = notifyManager;
