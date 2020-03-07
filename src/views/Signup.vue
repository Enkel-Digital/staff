<template>
  <div class="signup">
    <img
      alt="Login image"
      src="../assets/logo_square.png"
      width="360"
      height="360"
    />

    <input
      v-autofocus
      type="text"
      v-model="name"
      placeholder="Name"
      @keypress.enter="signUp"
      required
    />
    <br />
    <input
      type="text"
      v-model="email"
      placeholder="Email"
      @keypress.enter="signUp"
      required
    />

    <p class="error">{{ error_msg }}</p>
    <button @click="signUp">Sign Up</button>
    <br />
    <button id="back-btn" @click="back">Back</button>
  </div>
</template>

<script>
/**
 * @Todo - Add in browser's "required" attribute checker for input.
 */

import { newSignupRequest } from "../backend";

// Function to map and return a given err.code to a user friendly message
// eslint-disable-next-line no-unused-vars
function error_msg(err) {
  switch (err.code) {
    case "auth/network-request-failed":
      return "Oops, check your internet connection!";
    case "auth/email-already-in-use":
      return "The email address is already in use!";
    default:
      return "Something went wrong! Please try again.";
  }
}

export default {
  name: "signup",
  data() {
    return {
      email: "",
      name: "",
      error_msg: ""
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "welcome" });
    },
    async signUp() {
      try {
        // Make a signup request for the specified user and email
        const response = await newSignupRequest({
          email: this.email,
          name: this.name
        });

        alert("Signup request sent, check your email inbox later for approval");
      } catch (error) {
        // Set the message into the error box to show user the error
        this.error_msg = error_msg(error);
      }
    }
  }
};
</script>

<style scoped>
img {
  background-size: cover;
}

input {
  margin: 1em 0;
  padding: 1em;

  width: 70%;
  max-width: 20em;

  border-radius: 1em;
}

button {
  margin: 1em 0 0 0;

  width: 70%;
  height: 3em;
  max-width: 20em;

  border-style: solid;
  border-width: thin;
  border-radius: 4em;
}

.error {
  margin-top: 1em;
}

#back-btn {
  border-style: solid;
  border-width: thin;
  border-radius: 4em;
}
</style>
