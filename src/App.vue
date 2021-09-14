<template>
  <div id="app">
    <Loader v-if="showLoading" />
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
  created() {
    console.log("e");
  },
  computed: {
    ...mapState({
      showLoading: (state) => state.showLoading,
    }),
  },
};
</script>

<style lang="scss">
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
