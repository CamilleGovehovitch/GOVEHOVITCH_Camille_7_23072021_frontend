<template>
  <div v-if="post">
    <div class="postContainer showPosts">
      <div class="profilPictureContainer">
        <img :src="post.user.attachement" :alt="image.alt" v-if="post.user.attachement" />
        <img src="../assets/images/icon.png" alt="photo de profile" v-else />
      </div>
      <div class="postContent" id="postContent">
        <router-link :to="{ name: 'Post', params: { id: post.id } }">
          <span class="postContentTitle">{{ post.title }}</span>
        </router-link>

        <p>{{ post.content }}</p>

        <div v-if="post.attachement" class="postAttachement">
          <img :src="post.attachement" :alt="image.alt" />
        </div>
        <div class="likeDislikeContainer">
          <div class="likeFeature">
            <span class="count">{{ post.likes.length }}</span>
            <i class="far fa-thumbs-up" :class="likedByCurrentUser() ? 'liked' : ''" @click="like"></i>
          </div>
          <div class="likeFeature">
            <span class="count">{{ post.dislikes.length }}</span>
            <i class="far fa-thumbs-down" :class="dislikedByCurrentUser() ? 'disliked' : ''" @click="dislike"></i>
          </div>
          <div class="likeFeature">
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
              <span>{{ post.comment.length }}</span>
              <i class="far fa-comment-alt"></i>
            </router-link>
          </div>
        </div>
        <div class="adminContainer" v-if="userProfile.is_admin">
          <button @click="emitDeletePost" v-if="this.$route.name === 'Home'">Supprimer</button>
        </div>
        <div class="adminContainer" v-if="userProfile.id === post.userId">
          <router-link :to="{ name: 'Update', params: { id: post.id } }">
            <button>Modifier</button>
          </router-link>
        </div>
      </div>
      <div class="backToHome" v-if="this.$route.params.id">
        <router-link to="/">
          <i class="fas fa-arrow-left"></i>
        </router-link>
      </div>
    </div>
    <div v-if="this.$route.params.id">
      <div class="answerComment" v-if="!answerComment">
        <button @click="changeComments">Poster un Commentaire</button>
      </div>
      <div class="answerContent" v-else>
        <div class="answerContent">
          <textarea id="commentContent" cols="30" rows="10"></textarea>
        </div>
        <button @click="emitCreateComment" type="submit" class="valide">valider</button>
        <button @click="changeComments" class="cancel">annuler</button>
      </div>
    </div>
    <div v-if="likeMessage" class="messageLiked">
      <p>{{ likeMessage }}</p>
    </div>
    <div v-if="dislikeMessage" class="messageDisliked">
      <p>{{ dislikeMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostTemplate",
  data() {
    return {
      likeMessage: null,
      dislikeMessage: "",
      answerComment: false,
      image: {
        alt: "Photo de Profile",
      },
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
    changeComments() {
      this.answerComment = !this.answerComment;
    },
    likeMessageBindClass() {
      return true;
    },
    likedByCurrentUser() {
      return this.post.likes.find((like) => {
        return like.userId === this.userProfile.id;
      });
    },
    async like() {
      if (this.likedByCurrentUser()) {
        try {
          const response = await this.sendUnlikeToApi();
          const unliked = response.data;
          this.post.likes.splice(unliked, 1);
          this.likeMessage = "";
        } catch (error) {
          console.log(error);
        }
      } else {
        const response = await this.sendLikeToApi();
        const liked = response.data;
        this.post.likes.push(liked);
        this.likeMessage = "";
        this.likeMessage = "Post Liké";
      }
    },
    dislikedByCurrentUser() {
      return this.post.dislikes.find((dislike) => {
        return dislike.userId === this.userProfile.id;
      });
    },
    async dislike() {
      if (this.dislikedByCurrentUser()) {
        try {
          const response = await this.sendUndislikeToApi();
          const undisliked = response.data;
          this.post.dislikes.splice(undisliked, 1);
          this.dislikeMessage = "";
        } catch (error) {
          console.log(error);
        }
      } else {
        const response = await this.sendDislikeToApi();
        const disliked = response.data;
        this.post.dislikes.push(disliked);
        this.dislikeMessage = "";
        this.dislikeMessage = "Post Disliké";
      }
    },
    sendLikeToApi() {
      const token = localStorage.getItem("token");

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
      const token = localStorage.getItem("token");
      return this.axios.delete("http://localhost:3000/api/post/" + this.post.id + "/like", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    sendDislikeToApi() {
      const token = localStorage.getItem("token");
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
      const token = localStorage.getItem("token");
      return this.axios.delete("http://localhost:3000/api/post/" + this.post.id + "/dislike", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    //Events
    emitDeletePost() {
      const postId = this.post.id;
      this.$emit("delete-sent", {
        postId: postId,
      });
    },
    emitUpdatePost() {
      const postId = this.post.id;
      this.$emit("update-sent", {
        postId: postId,
      });
    },
    emitCreateComment() {
      const content = document.getElementById("commentContent").value;
      const postId = this.post.id;
      this.answerComment = !this.answerComment;
      this.$emit("create-comment-sent", {
        postId: postId,
        content: content,
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
  background-color: white;
  padding: 15px 0;
  // width: 90%;
  .profilPictureContainer {
    width: 30%;
    img {
      width: 70px;
      border-radius: 50%;
      @media (min-width: 768px) {
        width: 100px;
      }
      @media (min-width: 1024px) {
        width: 110px;
      }
      @media (min-width: 1440px) {
        width: 150px;
      }
      @media (min-width: 2560px) {
        width: 170px;
      }
    }
  }
  .postContent {
    width: 70%;
    a {
      text-decoration: none;
    }
    .postContentTitle {
      color: darken($primaryColor, 10%);
      font-size: 18px;
      font-weight: bold;
      span {
        margin-bottom: 20px;
      }
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
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 20px 0;
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
        @media (min-width: 1024px) {
          width: 25%;
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
    }
    .likeDislikeContainer {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      .likeFeature {
        margin-right: 10px;
        a {
          text-decoration: none;
          color: black;
        }
        span {
          margin-right: 5px;
          @media (min-width: 1440px) {
            font-size: 30px;
            margin-right: 10px;
          }
        }
        i {
          @media (min-width: 1024px) {
            font-size: 20px;
          }
          @media (min-width: 1440px) {
            font-size: 25px;
          }
          @media (min-width: 2560px) {
            font-size: 30px;
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
        @media (min-width: 2560px) {
          font-size: 40px;
        }
      }
    }
  }
}
@keyframes translatePost {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.messageLiked {
  background-color: lightgreen;
  animation: translatePost 300ms both;
}
.messageDisliked {
  background-color: lightcoral;
  animation: translatePost 300ms both;
}
.liked {
  color: green;
}
.disliked {
  color: red;
}
.backToHome {
  a {
    color: darken($primaryColor, 10);
    font-size: 18px;
    text-decoration: none;
    padding: 20px;
    transition: color 300ms ease-in-out;
    &:hover {
      color: black;
    }
  }
}
.answerComment {
  button {
    @include btn;
    margin: auto;
    background-color: green;
    @media(min-width: 1024px) {
      width: 50%;
    }
  }
}
.answerContent {
  textarea {
    width: 90%;
  }
  button {
    @include btn;
    margin: auto;
    margin-bottom: 10px;
  }
  .valide {
    background-color: lighten(green, 10);
    transition: background-color 300ms ease-in-out;
    &:hover {
      background-color: green;
    }
    @media(min-width: 1024px) {
      width: 50%;
    }
  }
  .cancel {
    background-color: darken($primaryColor, 10);
    transition: background-color 300ms ease-in-out;
    &:hover {
      background-color: $primaryColor;
    }
    @media(min-width: 1024px) {
      width: 50%;
    }
  }
}
</style>
