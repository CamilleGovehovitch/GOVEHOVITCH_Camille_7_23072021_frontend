<template>
  <div class="home">
    <div class="content-container">
      <UserPanel />

      <div class="paginationContainerTop">
        <button v-for="page in pages()" :key="page.id" @click="changePage(page)" class="pagination" :class="offset === page ? 'currentPage' : ''">
          {{ page }}
        </button>
      </div>

      <div class="post" v-for="post in posts" :key="post.id">
        <PostTemplate :post="post" @delete-sent="deletePostFromApi" />
      </div>
      <button v-for="page in pages()" :key="page.id" @click="changePage(page)" class="pagination" :class="offset === page ? 'currentPage' : ''">
        {{ page }}
      </button>
    </div>
    <div class="createPostContainer">
      <ButtonCreatePost />
    </div>
  </div>
</template>

<script>
import UserPanel from "@/components/UserPanel.vue";
import PostTemplate from "@/components/PostTemplate.vue";
import ButtonCreatePost from "@/components/ButtonCreatePost.vue";

export default {
  name: "Home",
  components: {
    UserPanel,
    PostTemplate,
    ButtonCreatePost,
  },
  data() {
    return {
      myPosts: null,
      postsCount: null,
      offset: 1,
      limit: 10,
    };
  },
  async beforeMount() {
    this.checkToken();
    this.$store.dispatch("getUserProfile");
    await this.fetchPost();
  },
  computed: {
    posts: {
      get() {
        return this.myPosts;
      },
      set(value) {
        this.myPosts = value;
      },
    },
  },
  methods: {
    checkToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        window.location.href = "#/user/login";
      }
    },
    getPostsFromApi() {
      const token = localStorage.getItem("token");
      return this.axios.get("http://localhost:3000/api/post?limit=" + this.limit + "&offset=" + this.offset, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    pagesCount() {
      return Math.ceil(this.postsCount / this.limit);
    },
    pages() {
      let pages = [];
      for (let i = 1; i <= this.pagesCount(); i++) {
        pages.push(i);
      }
      return pages;
    },
    async changePage(page) {
      this.offset = page;
      await this.fetchPost();
    },
    //FETCH POST
    async fetchPost() {
      try {
        this.$store.commit("LOADING_SPINNER_SHOW_MUTATION", true);
        const postsResponse = await this.getPostsFromApi();
        this.posts = postsResponse.data.rows;
        this.postsCount = postsResponse.data.count;
        this.$store.commit("LOADING_SPINNER_SHOW_MUTATION", false);
      } catch (error) {
        console.log(error);
      }
    },
    async deletePostFromApi(payload) {
      const response = await this.sendDeletePostToApi(payload.postId);
      console.log(response);
      if (response) {
        console.log(response, "INSIDE");
        const postToDelete = this.posts.find((post) => {
          return post.id === payload.postId;
        });
        const indexOfPostToDelete = this.posts.indexOf(postToDelete);
        console.log(indexOfPostToDelete);
        this.posts.splice(indexOfPostToDelete, 1);
        await this.fetchPost("after delete");
      }
    },
    sendDeletePostToApi(postId) {
      const token = localStorage.getItem("token");
      return this.axios.delete("http://localhost:3000/api/post/" + postId, {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-store",
          Authorization: "Bearer " + token,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #fd2d02;

@import "../sass/utils/reset.scss";

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
.currentPage {
  background-color: lighten($primaryColor, 20%);
}
.pagination {
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  margin-bottom: 20px;
  &:hover {
    background-color: lighten($primaryColor, 30%);
  }
}

.home {
  background-image: url("../assets/images/icon.png");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  width: 100%;
  .paginationContainerTop {
    padding-top: 180px;
    @media (min-width: 1440px) {
      padding-top: 200px;
    }
  }
}

.post {
  width: 90%;
  margin: auto;
  border: solid 1px darken($primaryColor, 10%);
  margin-bottom: 20px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
  transition: box-shadow ease-in-out 330ms;
  animation: translatePost 600ms 500ms both;
  &:hover {
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.8);
  }
  @media (min-width: 1024px) {
    width: 80%;
    margin: auto;
    margin-bottom: 20px;
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
  }
}
</style>
