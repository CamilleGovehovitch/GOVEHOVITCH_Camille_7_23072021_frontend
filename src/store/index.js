import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
//constante
export const LOADING_SPINNER_SHOW_MUTATION = "[mutations] show loading spinner";

//to handle state
const state = {
  posts: [],
  userProfile: {},
  showLoading: false,
};

//to handle state
const getters = {};

//to handle actions
const actions = {
  getPosts({ commit }) {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      commit("SET_POSTS", response.data);
    });
  },
  getUserProfile({ commit }) {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/user/profile", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        commit("SET_USER_PROFILE", response.data);
      });
  },
  getLoading({ commit }) {
    commit("LOADING_SPINNER_SHOW_MUTATION", true);
  },
};

//to handle mutations
const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_USER_PROFILE(state, userProfile) {
    state.userProfile = userProfile;
  },
  LOADING_SPINNER_SHOW_MUTATION(state, payload) {
    state.showLoading = payload;
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
