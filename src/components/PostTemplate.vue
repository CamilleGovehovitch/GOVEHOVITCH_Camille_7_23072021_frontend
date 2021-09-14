<template>
  <div class="postContainer">
    <div class="profilPictureContainer">
      <img :src="post.user.attachement" alt="photo de profile" />
    </div>
    <div class="postContent">
      <span class="postContentTitle">{{ post.title }}</span>
      <p>{{ post.content }}</p>
      <div v-if="post.attachement" class="postAttachement">
        <img :src="post.attachement" alt="image" />
      </div>
      <div class="likeDislikeContainer">
        <div class="likeFeature">
          <span class="count">{{ post.likes.length }}</span>
          <i class="far fa-thumbs-up" :class="likedByCurrentUser() ? 'liked' : ''" @click="like"></i>
        </div>
        <div class="likeFeature">
          <span class="count">{{ post.dislikes.length }}</span>
          <i class="far fa-thumbs-down" :class="dislikeByCurrentUser() ? 'disliked' : ''" @click="dislike"></i>
        </div>
      </div>
      <div class="adminContainer" v-if="userProfile.is_admin">
        <button @click="sendDeletePostToApi">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostTemplate",
  data() {
    return {
      liked: false,
      disliked: false,
      user: null,
    };
  },
  async beforeMount() {
    this.$store.dispatch("getUserProfile");
  },
  props: ["post"],
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
  },
  methods: {
    likedByCurrentUser() {
      return this.post.likes.find((like) => {
        console.log(like, "INSIDE FIND LIKE");
        return like.userId === this.userProfile.id;
      });
    },
    async like() {
      console.log(this.likedByCurrentUser());
      if (this.likedByCurrentUser()) {
        const indexToDelete = this.post.likes.indexOf(this.likedByCurrentUser());
        console.log(indexToDelete);
        console.log(this.post.likes);
        this.post.likes.slice(indexToDelete, 1);
        console.log(this.post.likes);
      } else {
        const response = await this.sendLikeToApi();
        const liked = response.data;
        console.log(liked);
        this.post.likes.push(liked);
      }
    },
    dislikeByCurrentUser() {
      return this.post.dislikes.find((dislike) => {
        console.log(dislike, "INSIDE FIND DISLIKE");
        return dislike.userId === this.userProfile.id;
      });
    },
    async dislike() {
      this.disliked = !this.disliked;
      if (this.dislikeByCurrentUser()) {
        const indexToDelete = this.post.dislikes.indexOf(this.dislikedByCurrentUser());
        console.log(indexToDelete);
        console.log(this.post.dislikes);
        this.post.dislikes.slice(indexToDelete, 1);
        console.log(this.post.dislikes);
      } else {
        const response = await this.sendDislikeToApi();
        const disliked = response.data;
        console.log(disliked);
        this.post.dislikes.push(disliked);
      }
    },
    sendLikeToApi() {
      console.log("like sended");
      const token = localStorage.getItem("token");
      console.log(token);
      return this.axios.post(
        "http://localhost:3000/api/post/" + this.post.id + "/like",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    },
    sendUnlikeToApi() {
      console.log("unlike sended");
      const token = localStorage.getItem("token");
      console.log(token);
      return this.axios.delete("http://localhost:3000/api/post/" + this.post.id + "/like", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    sendDislikeToApi() {
      console.log("dislike sended");
      const token = localStorage.getItem("token");
      console.log(token);
      return this.axios.post(
        "http://localhost:3000/api/post/" + this.post.id + "/dislike",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    },
    sendUndislikeToApi() {
      console.log("undislike sended");
    },
    async deletePost() {
      const response = await this.sendDeletePostToApi();
      if (response) {
        location.reload();
      }
    },
    sendDeletePostToApi() {
      console.log("hello");
      const token = localStorage.getItem("token");
      console.log(token);
      return this.axios.delete("http://localhost:3000/api/post/" + this.post.id, {
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

@mixin btn {
  width: 80%;
  color: white;
  display: block;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px 10px;
}

.postContainer {
  display: flex;
  align-items: center;
  .profilPictureContainer {
    width: 30%;
    img {
      width: 70px;
      border-radius: 50%;
      @media (min-width: 768px) {
        width: 180px;
      }
      @media (min-width: 1440px) {
        width: 200px;
      }
    }
  }
  .postContent {
    width: 70%;
    .postContentTitle {
      color: darken($primaryColor, 10%);
      font-size: 18px;
      font-weight: bold;
      @media (min-width: 1024px) {
        font-size: 25px;
      }
      @media (min-width: 1440px) {
        font-size: 30px;
      }
      @media (min-width: 2560px) {
        font-size: 50px;
      }
    }
    p {
      font-size: 16px;
      @media (min-width: 1024px) {
        font-size: 20px;
      }
      @media (min-width: 1440px) {
        font-size: 30px;
      }
      @media (min-width: 1440px) {
        font-size: 30px;
      }
      @media (min-width: 2560px) {
        font-size: 33px;
      }
    }
    .postAttachement {
      img {
        width: 50%;
      }
    }
    .likeDislikeContainer {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      .likeFeature {
        margin-right: 10px;
        span {
          margin-right: 5px;
          @media (min-width: 1440px) {
            font-size: 30px;
            margin-right: 10px;
          }
        }
        i {
          @media (min-width: 1440px) {
            font-size: 80px;
          }
        }
        @media (min-width: 1440px) {
            margin-right: 20px;
          }
      }
    }
    .adminContainer {
      button {
        background-color: darken($primaryColor, 10%);
        margin: auto;
        @include btn;
        transition: background-color ease-in-out 300ms;
        &:hover {
          background-color: $primaryColor;
        }
        @media (min-width: 768px) {
          width: 50%;
        }
      }
    }
  }
}

.liked {
  color: green;
}
.disliked {
  color: red;
}
</style>
