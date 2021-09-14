<template>
  <div>
    <CreatePost />
  </div>
</template>

<script>
import CreatePost from "@/components/CreatePost.vue";

export default {
  name: "Create",
  components: {
    CreatePost,
  },
  data() {
    return {
      token: null,
    };
  },
  beforeMount() {
    this.checkToken();
  },
  computed: {},
  methods: {
    checkToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("empty token");
        return (window.location.href = "#/user/login");
      }
    },
  },
};
</script>

<style scoped></style>
