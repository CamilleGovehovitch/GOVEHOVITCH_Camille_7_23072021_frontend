<template>
  <div v-if="user">
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
          <i class="far fa-thumbs-down" :class="disliked ? 'disliked' : ''" @click="dislike"></i>
        </div>
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
        console.log(like, "INSIDE FIND");
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
      //   const thumbsUps = document.querySelector(".fa-thumbs-up");
      //   // for(thumbs of thumbsUps) {
      //   //   console.log(thumbs);
      //   // }
      //   if (!thumbsUps.classList.contains("liked")) {
      //     console.log("green");
      //     thumbsUps.classList.add("liked");
      //     this.sendLikeToApi();
      //   } else {
      //     thumbsUps.classList.remove("liked");
      //     console.log("not green");
      //   }

      //   console.log(thumbsUps);
    },
    dislike() {
      this.disliked = !this.disliked;
      //   console.log("dislike");
      //   const thumbsDown = document.querySelector(".fa-thumbs-down");
      //   console.log(thumbsDown);
      //   thumbsDown.classList.contains("disliked") ? thumbsDown.classList.remove("disliked") : thumbsDown.classList.add("disliked");
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
      return this.axios.delete(
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
    sendDislikeToApi() {
      console.log("dislike sended");
    },
    sendUndislikeToApi() {
      console.log("undislike sended");
    },
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #fd2d02;

.profilPictureContainer {
  width: 30%;
  img {
    width: 50px;
    border-radius: 50%;
  }
}
.postContent {
  width: 70%;
  .postContentTitle {
    color: darken($primaryColor, 10%);
    font-size: 18px;
    font-weight: bold;
  }
  .postAttachement {
    img {
      width: 50%;
    }
  }
  .likeDislikeContainer {
    display: flex;
    justify-content: center;
    .likeFeature {
      margin-right: 10px;
      span {
        margin-right: 5px;
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
