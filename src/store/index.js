import Vue from "vue";
import Vuex from "vuex";

// Mock server data
import data from "./mock_data/data";

// Import server communication modules
import users from "./users";

// Import serverless function call
import notifyManager from "./notifyManager";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: "",
    name: "",
    ipads: {},
    walkies: {},
    problems: [],
    history: []
  },
  mutations: {
    // Update email function, updates the user's name too
    update_email: function(state, new_email) {
      state.email = new_email;
    },
    update_name: function(state, new_name) {
      // Defaults to name associated with the email from server data
      new_name = new_name || users.getUsername(state.email);

      state.name = new_name;
    },
    new_problem: async function(state, new_problem_object) {
      // Get the time where problem is reported at
      const date = new Date();
      const timestamp = date.getTime();

      // Use timestamp as a unique problem ID for v-bind:key in Faulty-list
      new_problem_object.id = timestamp;
      new_problem_object.timestamp = timestamp;
      new_problem_object.time = date.toString();

      state.problems.push(new_problem_object);

      // Remove problem id before emailing DTM as its not needed
      delete new_problem_object.id;
      await notifyManager("", new_problem_object);
    }
  },
  actions: {
    load_data: function({ commit }) {
      commit("update_data", data);
    }
  },
  modules: {}
});
