/**
 * Folder with functions that wrap over backend calls for abstraction
 */

import post from "../utils/post";

function newSignupRequest(signupRequestDetails) {
  return post(
    "https://us-central1-ekd-staff.cloudfunctions.net/signUpRequest",
    signupRequestDetails
  );
}

export { newSignupRequest };
