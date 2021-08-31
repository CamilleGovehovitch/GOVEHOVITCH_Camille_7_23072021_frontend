<template>
  <div>
    <section class="header">
      <div class="profileName">
        <h1>GROUPOMANIA</h1>
        <!-- <span>{{ post.user.username }}</span> -->
      </div>
      <div class="profilePictureContainer">
        <router-link to="/user/profile">
          <img src="../assets/images/palpatine.jpg" alt="photo de profile" />
        </router-link>
      </div>
    </section>
    <section class="main">
      <div class="postContainer" v-for="post in posts" :key="post.id">
        <PostTemplate :post="post" />
        <!-- <div class="profilPictureContainer">
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
              <i class="far fa-thumbs-up" id="thumbs" @click="like"></i>
            </div>
            <div class="likeFeature">
              <span class="count">{{ post.dislikes.length }}</span>
              <i class="far fa-thumbs-down" @click="dislike"></i>
            </div>
          </div>
        </div> -->
      </div>
      <div class="createPostContainer">
        <router-link to="/post/new">
          <div class="createPost">
            <i class="fas fa-plus"> </i>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import PostTemplate from "@/components/PostTemplate.vue";

export default {
  name: "HomePage",
  components: {
    PostTemplate,
  },
  data() {
    return {
      posts: null,
    };
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "#/user/login";
    }
  },
  async beforeMount() {
    const response = await this.getPostsFromApi();
    this.posts = response.data;
    console.log(response);
  },
  methods: {
    getPostsFromApi() {
      const token = localStorage.getItem("token");
      if (!token) {
        // window.location.href = "/user/login";
        console.log("empty");
      }
      return this.axios.get("http://localhost:3000/api/post?limit=10&offset=1", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    like() {
      console.log("like");
      const thumbsUps = document.querySelector(".fa-thumbs-up");
      // for(thumbs of thumbsUps) {
      //   console.log(thumbs);
      // }
      if (!thumbsUps.classList.contains("liked")) {
        console.log("green");
        thumbsUps.classList.add("liked");
        this.sendLikeToApi();
      } else {
        thumbsUps.classList.remove("liked");
        console.log("not green");
      }

      console.log(thumbsUps);
    },
    dislike() {
      console.log("dislike");
      const thumbsDown = document.querySelector(".fa-thumbs-down");
      console.log(thumbsDown);
      thumbsDown.classList.contains("disliked") ? thumbsDown.classList.remove("disliked") : thumbsDown.classList.add("disliked");
    },
    sendLikeToApi() {
      console.log("like sended");
    },
    sendUnlikeToApi() {
      console.log("unlike sended");
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

.header {
  background-color: lighten($primaryColor, 45%);
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  margin-bottom: 30px;
  .profileName {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 20px;
      font-weight: Bold;
      color: $primaryColor;
    }
    h1 {
      color: darken($primaryColor, 10%);
    }
  }
  .profilePictureContainer {
    img {
      width: 100px;
      border-radius: 50%;
    }
  }
}
.main {
  background-color: lighten($primaryColor, 45%);
  .postContainer {
    background-color: white;
    padding: 10px 5px;
    display: flex;
    //   justify-content: space-between;
    border: solid 1px darken($primaryColor, 10%);
    margin-bottom: 30px;
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.26);
    align-items: center;
    // .profilPictureContainer {
    //   width: 30%;
    //   img {
    //     width: 50px;
    //     border-radius: 50%;
    //   }
    // }
    // .postContent {
    //   width: 70%;
    //   .postContentTitle {
    //     color: darken($primaryColor, 10%);
    //     font-size: 18px;
    //     font-weight: bold;
    //   }
    //   .postAttachement {
    //     img {
    //       width: 50%;
    //     }
    //   }
    //   .likeDislikeContainer {
    //     display: flex;
    //     justify-content: center;
    //     .likeFeature {
    //       margin-right: 10px;
    //       span {
    //         margin-right: 5px;
    //       }
    //     }
    //   }
    // }
  }
}
.createPostContainer {
  // position: absolute;
  bottom: 35px;
  right: 35px;
  .createPost {
    background-color: white;
    color: darken($primaryColor, 10%);
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px darken($primaryColor, 10%);
    border-radius: 50%;
    a {
      text-decoration: none;
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
