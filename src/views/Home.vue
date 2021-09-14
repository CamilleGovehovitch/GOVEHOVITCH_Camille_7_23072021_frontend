<template>
  <div class="home">
    <div>
      <UserPanel />
      <!-- <HomePage /> -->
      <div class="post" v-for="post in posts" :key="post.id">
        <PostTemplate :post="post" />
      </div>
    </div>
    <div class="createPostContainer">
      <router-link to="/post/new">
        <div class="createPost">
          <i class="fas fa-plus"> </i>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserPanel from "@/components/UserPanel.vue";
import PostTemplate from "@/components/PostTemplate.vue";


export default {
  name: "Home",
  components: {
    UserPanel,
    PostTemplate,
  },
  data() {
    return {
      posts: null,
      pages: null,
    };
  },
  async beforeMount() {
    this.$store.commit("LOADING_SPINNER_SHOW_MUTATION", true);
    const postsResponse = await this.getPostsFromApi();
    this.$store.commit("LOADING_SPINNER_SHOW_MUTATION", false);

    this.posts = postsResponse.data.rows;
    this.pages = postsResponse.data.count;
  },
  mounted() {
    this.checkToken();
  },
  computed: {},
  methods: {
    checkToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("empty token");
        return (window.location.href = "#/user/login");
      }
    },
    getPostsFromApi() {
      const token = localStorage.getItem("token");
      return this.axios.get("http://localhost:3000/api/post?limit=10&offset=1", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
  },

  //appel fetch pr rafraichir les posts et les stocker ds un data, créer ta vue pr instancier les nouveaux posts
};
</script>

<style lang="scss" scoped>
$primaryColor: #fd2d02;

.post {
  border: solid 1px darken($primaryColor, 10%);
  margin-bottom: 20px;
  padding: 10px 5px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
  transition: box-shadow ease-in-out 330ms;
  &:hover {
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.53);
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
</style>
