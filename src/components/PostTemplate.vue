<template>
  <div v-if="user" class="postContainer">
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
      <div class="adminContainer" v-if="post.user.is_admin">
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
    const response = await this.getProfile();
    this.user = response.data;
    console.log(this.post, this.user);
  },
  props: ["post"],
  methods: {
    async getProfile() {
      const token = localStorage.getItem("token");
      return this.axios.get("http://localhost:3000/api/user/profile", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    likedByCurrentUser() {
      return this.post.likes.find((like) => {
        console.log(like, "INSIDE FIND LIKE");
        return like.userId === this.user.id;
      });
    },
    async like() {
      console.log(this.likedByCurrentUser());
      if (this.likedByCurrentUser()) {
        const indexToDelete = this.post.likes.indexOf(this.likedByCurrentUser());
        console.log(indexToDelete);
        // const response = await this.sendUnlikeToApi();
        // const unliked = response.data;
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
        return dislike.userId === this.user.id;
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
    }
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
  // border: solid;
  // background-color: white;
  // padding: 10px 5px;
  display: flex;

  .profilPictureContainer {
    width: 30%;
    img {
      width: 50px;
      border-radius: 50%;
      @media (min-width: 768px) {
        width: 180px;
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
