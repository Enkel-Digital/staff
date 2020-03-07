import post from "../utils/post";

/**
 * @async
 * @function newSignupRequest
 * @param {object} signupRequestDetails Object containing info needed for requesting for a new account.
 * @return {Promise<object>} The response object from the cloud function.
 */
function newSignupRequest(signupRequestDetails) {
  return post(
    "https://us-central1-ekd-staff.cloudfunctions.net/signUpRequest",
    signupRequestDetails
  );
}

export default newSignupRequest;
