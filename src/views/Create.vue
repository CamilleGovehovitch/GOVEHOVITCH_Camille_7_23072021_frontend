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
    return {};
  },
  beforeMount() {
    this.checkToken();
  },
  computed: {},
  methods: {
    checkToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "#/user/login";
      }
    },
    // async sendCreatePost(payload) {
    //   const response = await this.createPost(payload.formData);
    //   if (response) {
    //     window.location.href = "/";
    //   }
    // },
    async sendUpdatePost(payload) {
      const response = await this.updatePost(payload.postId, payload.formData);
      if (response) {
        window.location.href = "/";
      }
    },
    // createPost(formData) {
    //   const token = localStorage.getItem("token");
    //   return this.axios.post("http://localhost:3000/api/post/new", formData, {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "multipart/form-data",
    //       Authorization: "Bearer " + token,
    //     },
    //   });
    // },
    updatePost(postId, formData) {
      console.log(formData);
      console.log("hey hey");
      const token = localStorage.getItem("token");
      return this.axios.put("http://localhost:3000/api/post/" + postId, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
    },
  },
};
</script>

<style scoped></style>
