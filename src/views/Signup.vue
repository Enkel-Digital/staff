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
      placeholder="Username"
      @keypress.enter="signUp"
      required
    />
    <br />
    <input
      type="password"
      v-model="password"
      placeholder="Password"
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

import firebase from "firebase";

// Function to map and return a given err.code to a user friendly message
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
      password: "",
      error_msg: ""
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "welcome" });
    },
    signUp() {
      // After signup, user will be automatically signed in, thus redirect to home
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(usr => {
          // Save user's email to vuex and update the user's name
          this.$store.commit("update_email", usr.user.email);
          this.$store.commit("update_name", this.name);

          // Route to the user's home page, after login
          this.$router.replace({ name: "home", params: { user: name } });
        })
        .catch(err => {
          // Set the message into the error box to show user the error
          this.error_msg = error_msg(err);
        });
    }
  },
  beforeCreate() {
    // Route back to welcome page as page implementation not completed yet
    this.$router.replace({ name: "welcome" });
    alert("Signup not available yet!");
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
