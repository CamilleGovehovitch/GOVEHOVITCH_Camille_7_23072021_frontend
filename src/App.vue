<template>
  <div id="app">
    <Loader v-if="postLoading" />
    <router-view />
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import { mapState } from "vuex";

export default {
  components: {
    Loader,
  },
  data() {
    return {};
  },
  beforeMount() {
    this.checkToken();
  },
  computed: {
    ...mapState({
      postLoading: (state) => state.postLoading,
    }),
  },
  methods: {
    checkToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        return (window.location.href = "#/user/login");
      }
    },
  },
};
</script>

<style lang="scss">
@import "./sass/utils/reset.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
