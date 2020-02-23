import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import firebase from "firebase";
import autofocus from "./directives/autofocus";

Vue.config.productionTip = false;

// Register global custom directive called `v-autofocus`
Vue.directive("autofocus", autofocus);

// firebaseConfig auto generated in project settings
firebase.initializeApp({
  apiKey: "AIzaSyAwU6IZ69Dkiv1WQ9F-ERUGLd4_pv7MeBg",
  authDomain: "ekd-staff.firebaseapp.com",
  databaseURL: "https://ekd-staff.firebaseio.com",
  projectId: "ekd-staff",
  storageBucket: "ekd-staff.appspot.com",
  messagingSenderId: "627663689313",
  appId: "1:627663689313:web:47a7ea95f4acfcdaf83c20"
});

// Detect if the user is using a mobile device
const isMobile = navigator.userAgent.match(
  /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
);
console.log("isMobile: ", isMobile);
if (!isMobile)
  alert("Please use this app only on mobile for a better experience!");

// Auth state is persisted even when window is closed, an explicit sign out is needed to clear state
firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    // Wait for firebase to finish initialization before creating the app.
    // So that the router navigation wont break due to invalid auth
    firebase.auth().onAuthStateChanged(() => {
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount("#app");
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    alert("Application Error, notify developer.");
  });
