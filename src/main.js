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

// Wait for firebase to finish initialization before creating the app.
// So that the router navigation wont break due to invalid auth
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
