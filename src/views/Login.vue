<template>
  <div class="login">
    <img
      alt="Login image"
      src="../assets/logo_square.png"
      width="360"
      height="360"
    />

    <input
      v-autofocus
      type="text"
      v-model="email"
      placeholder="Username"
      @keypress.enter="login"
      required
    />
    <br />
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      @keypress.enter="login"
      required
    />

    <p class="error">{{ error_msg }}</p>
    <button @click="login">Login</button>
    <br />
    <button id="back-btn" @click="back">Back</button>
  </div>
</template>

<script>
/**
 * @Todo - Add in browser's "required" attribute checker for input.
 */

import firebase from "firebase";

// Function to map and return a given err.code to a user friendly message
function error_msg(err) {
  switch (err.code) {
    case "auth/wrong-password":
      return "Invalid password or email.";
    case "auth/network-request-failed":
      return "Oops, check your internet connection!";
    default:
      return "Something went wrong! Please try again.";
  }
}

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error_msg: ""
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "welcome" });
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(usr => {
          // Save user's email to vuex and update the user's name
          this.$store.commit("update_email", usr.user.email);
          this.$store.commit("update_name");

          // Route to the user's home page, after login
          this.$router.replace({ name: "home", params: { user: name } });
        })
        .catch(err => {
          // Set the message into the error box to show user the error
          this.error_msg = error_msg(err);
        });
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
