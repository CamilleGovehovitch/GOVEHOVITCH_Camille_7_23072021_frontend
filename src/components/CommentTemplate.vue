<template>
  <div class="commentContainer">
    <div class="comment">
      <div class="usernameContainer">
        <p>{{ comment.username }}</p>
      </div>
      <div class="contentContainer">
        <p>{{ comment.content }}</p>
      </div>
      <div v-if="userProfile.is_admin" class="deleteContainer">
        <button @click="emitDeleteComment">Supprimer</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "commentTemplate",
  beforeMount() {},
  props: ["comment"],
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
  },
  methods: {
    emitDeleteComment() {
      const commentId = this.comment.id;
      const postId = this.$route.params.id;
      this.$emit("delete-comment-sent", {
        postId: postId,
        commentId: commentId,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$primaryColor: #fd2d02;

@mixin btn {
  width: 80%;
  color: white;
  display: block;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px 10px;
}

.commentContainer {
  display: flex;
  justify-content: center;
  .comment {
    border: solid 1px red;
    justify-content: space-between;
    margin-bottom: 18px;
    padding: 18px 20px 20px 30px;
    width: 80%;
  }
}
.usernameContainer {
  margin-right: 30px;
  font-weight: bold;
  margin-bottom: 15px;
}
.contentContainer {
  margin-bottom: 20px;
}
.deleteContainer {
  button {
    @include btn;
    margin: auto;
    background-color: darken($primaryColor, 10);
    &:hover {
      background-color: $primaryColor;
    }
  }
}
</style>
