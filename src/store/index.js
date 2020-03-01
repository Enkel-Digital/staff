import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// Import server communication modules
import users from "./users";

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
      new_name = new_name || users.getUsername(state.user.email);

      state.user.name = new_name;
    }
  },
  actions: {
    load_data: function({ commit }) {
      commit("update_data", {});
    }
  },
  plugins: [createPersistedState()]
});
