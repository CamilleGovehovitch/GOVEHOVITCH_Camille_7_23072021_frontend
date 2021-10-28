import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
//constante
export const LOADING_SPINNER_SHOW_MUTATION = "[mutations] show loading spinner";

//to handle state
const state = {
  userProfile: {},
  postLoading: false,
  test: "hello",
  userSubscriptionDate: "",
  currentUserId: null
};

//to handle state
const getters = {};

//to handle actions
const actions = {
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
        commit("SET_USER_SUBSCRIPTION_DATE", response.data)

      });
  },
  getLoading({ commit }) {
    commit("LOADING_SPINNER_SHOW_MUTATION", true);
  },
  // getCurrentUserId({commit}) {
  //   const token = localStorage.getItem("token");
  //   commit("SET_CURRENT_USER_ID", token.user)
  // }
};

//to handle mutations
const mutations = {
  SET_USER_PROFILE(state, userProfile) {
    state.userProfile = userProfile;
  },
  LOADING_SPINNER_SHOW_MUTATION(state, payload) {
    state.postLoading = payload;
  },
  SET_USER_SUBSCRIPTION_DATE(state, userProfile) {
    state.userSubscriptionDate = userProfile.createdAt.substring(0, 10);
  },
  // SET_CURRENT_USER_ID(state, token) {
  //   state.currentUserId = 
  // }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
