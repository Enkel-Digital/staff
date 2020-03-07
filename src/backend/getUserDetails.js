import post from "../utils/post";

/**
 * @async
 * @function getUserDetails
 * @param {object} userDetails Object containing info needed to identify the user
 * @return {Promise<object>} The response object from the cloud function.
 */
function getUserDetails(userDetails) {
  return post(
    "https://us-central1-ekd-staff.cloudfunctions.net/getUserDetails", // Change this API to get user's login Email via URL query param instead
    userDetails
  );
}

export default getUserDetails;
