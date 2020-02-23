import Vue from "vue";
import Vuex from "vuex";

// Mock server data
import data from "./mock_data/prefilledForms";

// Import server communication modules
import users from "./users";

// Import serverless function call
// import notifyManager from "./notifyManager";

import prefilledForms from "./mock_data/prefilledForms";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: "",
      name: ""
    },
    history: []
  },
  mutations: {
    // Update email function, updates the user's name too
    update_email: function(state, new_email) {
      state.user.email = new_email;
    },
    update_name: function(state, new_name) {
      // Defaults to name associated with the email from server data
      new_name = new_name || users.getUsername(state.email);

      state.user.name = new_name;
    }
  },
  actions: {
    load_data: function({ commit }) {
      commit("update_data", data);
    }
  },
  getters: {
    prefilledForm: state => {
      return prefilledForms[state.user.email];
    }
  }
});
