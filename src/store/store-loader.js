import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            showLoading: false
        }
    },
    mutations: {
        [LOADING_SPINNER_SHOW_MUTATION](state, payload) {
            state.showLoading = payload;
        }
    }
});
export default store; 