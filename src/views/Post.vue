<template>
  <div>
    <UserPanel />
    <div class="postContainer">
      <PostTemplate :post="post" class="post" @create-comment-sent="createComment" />
    </div>
    <p class="errorMessage">{{ error }}</p>

    <div class="commentContainer" v-for="comment in comments" :key="comment.id">
      <CommentTemplate :comment="comment" @delete-comment-sent="deleteComment" />
    </div>
  </div>
</template>
<script>
import UserPanel from "@/components/UserPanel.vue";
import PostTemplate from "@/components/PostTemplate.vue";
import CommentTemplate from "@/components/CommentTemplate.vue";

export default {
  name: "Post",
  components: {
    UserPanel,
    PostTemplate,
    CommentTemplate,
  },
  data() {
    return {
      post: null,
      comments: null,
      error: ''
    };
  },
  async beforeMount() {
    await this.fetchPost();
    this.$store.dispatch("getUserProfile");
  },
  methods: {
    getPostFromApi() {
      const token = localStorage.getItem("token");
      const postId = this.$route.params.id;
      return this.axios.get("http://localhost:3000/api/post/" + postId, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    async fetchPost() {
      // this.$store.commit("LOADING_SPINNER_SHOW_MUTATION", true);
      const postResponse = await this.getPostFromApi();
      this.post = postResponse.data;
      this.comments = postResponse.data.comment;
      // this.$store.commit("LOADING_SPINNER_SHOW_MUTATION", false);
    },
    async createComment(payload) {
      this.error = '';
      const response = await this.sendCreateCommentToApi(payload.postId, payload.content);
      if (response) {
        this.fetchPost();
      }
    },
    sendCreateCommentToApi(postId, content) {
      const token = localStorage.getItem("token");
      const body = {
        content: content,
      };

      return this.axios
        .post("http://localhost:3000/api/comment/" + postId + "/new", body, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .catch((error) => {
          this.error = '';
          this.error = error.response.data.error;
        });
    },

    async deleteComment(payload) {
      const response = await this.sendDeleteCommentToApi(payload.postId, payload.commentId);
      if (response) {
        this.fetchPost();
      }
    },
    sendDeleteCommentToApi(postId, commentId) {
      const token = localStorage.getItem("token");
      return this.axios.delete("http://localhost:3000/api/comment/" + postId + "/delete/" + commentId, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$primaryColor: #fd2d02;
.post {
  padding: 200px 0 20px 0;
  // position: fixed;
  width: 100%;
}
.commentContainer {
  // padding: 200px 0 20px 0;
}
.errorMessage {
    color: darken($primaryColor, 10%);
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
