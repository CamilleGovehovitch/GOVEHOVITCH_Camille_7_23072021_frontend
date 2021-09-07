<template>
  <div>
    <section class="main">
      <div class="post" v-for="post in posts" :key="post.id">
        <PostTemplate :post="post" />
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
// import mapGetters from 'vuex'
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
  computed: {
    // ...mapGetters(['getProfile'])
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
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #fd2d02;

// .header {
//   background-color: lighten($primaryColor, 45%);
//   display: flex;
//   justify-content: space-between;
//   padding: 10px 5px;
//   margin-bottom: 15px;
//   .profileName {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     span {
//       font-size: 20px;
//       font-weight: Bold;
//       color: $primaryColor;
//     }
//     h1 {
//       color: darken($primaryColor, 10%);
//     }
//   }
//   .profilePictureContainer {
//     img {
//       width: 100px;
//       border-radius: 50%;
//     }
//   }
// }
.main {
  background-color: lighten($primaryColor, 45%);
  .postContainer {
    background-color: white;
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    border: solid 1px darken($primaryColor, 10%);
    margin-bottom: 30px;
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.26);
    align-items: center;
  }
}
.createPostContainer {
  position: fixed;
  left: 30px;
  bottom: 60px;
  a {
    text-decoration: none;
    color: darken($primaryColor, 10%);
    text-align: end;
    // bottom: 35px;
    // right: 35px;
    .createPost {
      background-color: white;
      border-radius: 50%;
      border: solid 2px darken($primaryColor, 10%);
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.29);
      transition: ease-in-out 300ms;
      &:hover {
        background-color: darken($primaryColor, 10%);
        color: white;
      }
      @media (min-width: 1024px) {
        font-size: 25px;
        width: 70px;
        height: 70px;
      }
      @media (min-width: 1440px) {
        width: 70px;
        height: 70px;
      }
      @media (min-width: 2560px) {
        width: 50px;
        height: 50px;
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
