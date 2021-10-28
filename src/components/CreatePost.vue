<template>
  <div>
    <div class="header">
      <img src="../assets/images/icon.png" alt="" />
      <h1 v-if="this.update">{{ updateTitle }}</h1>
      <h1 v-else>{{ createTitle }}</h1>
    </div>
    <div class="newPostContainer">
      <form action="">
        <label for="postTitle"> Titre</label>
        <input type="text" id="postTitle" :value="!this.update ? '' : post.title" />
        <label for="postContent">Contenu</label>
        <textarea id="postContent" rows="10" :value="!this.update ? '' : post.content"></textarea>
        <div class="uploadFileContainer">
          <input type="file" id="image" ref="image" class="fileContent" @change="handleFileUpload" />
        </div>
        <div class="btnContainer">
          <div>
            <button type="submit" class="validationBtn" @click="createPost" v-if="this.$route.name === 'Create'">Envoyer</button>
            <button type="submit" class="validationBtn" @click="updatePost" v-else>Mettre a jour</button>
          </div>
          <div>
            <router-link to="/">
              <button class="cancelBtn">Annuler</button>
            </router-link>
          </div>
        </div>
      </form>
      <div>
        <p v-for="error in errors" :key="error" class="errorMessage">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  data() {
    return {
      createTitle: "Créé votre post",
      updateTitle: "Modifier votre post",
      image: "",
      post: null,
      update: false,
      errors: [],
    };
  },
  async beforeMount() {
    console.log("hey je peux créer");
    console.log(this.$route.params);

    this.$store.dispatch("getUserProfile");
    console.log(this.$route.name);
    if (this.$route.name === "Update") {
      console.log("je me met à jour");
      console.log(this.$route.params.id);

      this.update = true;
      await this.fetchPost();
    }
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
  },
  methods: {
    async createPost(e) {
      e.preventDefault();
      const title = document.getElementById("postTitle").value;
      const content = document.getElementById("postContent").value;
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", title);
      formData.append("content", content);
      console.log(formData, "FORMDATA");
      this.axios
        .post("http://localhost:3000/api/post/new", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          window.location.href = "/";
        })
        .catch(error => {
          console.log("error", error.response.data.error);
          this.errors = [];
          this.errors.push(error.response.data.error);
        });
    },
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },
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
      this.$store.commit("LOADING_SPINNER_SHOW_MUTATION", true);
      const postResponse = await this.getPostFromApi();
      this.post = postResponse.data;
      console.log(this.post);
      // this.comments = postResponse.data.comment;
      this.$store.commit("LOADING_SPINNER_SHOW_MUTATION", false);
    },
    // emitUpdatePost() {
    //   // const postId = this.$route.params.id;
    //   const title = document.getElementById("postTitle").value;
    //   const content = document.getElementById("postContent").value;
    //   let formData = new FormData();
    //   formData.append("image", this.image);
    //   formData.append("title", title);
    //   formData.append("content", content);
    //   this.$emit("update-post-sent", {
    //     formData: formData,
    //     image: this.image,
    //   });
    // },
    updatePost(e) {
      e.preventDefault();
      const title = document.getElementById("postTitle").value;
      const content = document.getElementById("postContent").value;
      const token = localStorage.getItem("token");
      const postId = this.$route.params.id;
      let formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", this.image);

      console.log(formData, "FORM DATA");
      this.axios
        .put("http://localhost:3000/api/post/" + postId + "/edit", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //EVENTS
    emitCreatePost() {
      const title = document.getElementById("postTitle").value;
      const content = document.getElementById("postContent").value;
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", this.image);
      this.$emit("create-post-sent", {
        formData,
        token,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #fd2d02;
$validationColor: #4e920e;

@mixin btn {
  width: 100%;
  color: white;
  display: block;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px 10px;
}

.header {
  margin-bottom: 20px;
  img {
    width: 50%;
    @media (min-width: 768px) {
      width: 25%;
    }
    @media (min-width: 1024px) {
      width: 30%;
    }
    @media (min-width: 1440px) {
      width: 20%;
    }
    @media (min-width: 2560px) {
      width: 30%;
    }
  }
  h1 {
    color: darken($primaryColor, 10%);
    margin: 0;
    font-weight: bold;
  }
}
.newPostContainer {
  form {
    label {
      display: block;
      margin-bottom: 10px;
      color: darken($primaryColor, 10%);
      font-weight: bold;
    }
    input {
      width: 80%;
      border: none;
      border-bottom: solid 1px black;
      margin-bottom: 20px;
      &::placeholder {
        text-align: center;
      }
    }
    textarea {
      width: 80%;
    }
    .uploadFileContainer {
      .fileContent {
        border-bottom: none;
        margin-top: 15px;
        margin-bottom: 0;
      }
    }
    .btnContainer {
      display: flex;
      justify-content: space-between;
      padding: 20px 30px;
      @media (min-width: 768px) {
        padding: 20px 60px;
      }
      @media (min-width: 1024px) {
        padding: 20px 90px;
      }
      @media (min-width: 1440px) {
        padding: 20px 130px;
      }
      @media (min-width: 2560px) {
        padding: 20px 200px;
      }
      .validationBtn {
        background-color: $validationColor;
        transition: background-color ease-in-out 300ms;
        @include btn;
        &:hover {
          background-color: lighten($validationColor, 10%);
        }
        @media (min-width: 1440px) {
          font-size: 20px;
        }
      }
      a {
        text-decoration: none;
        .cancelBtn {
          background-color: $primaryColor;
          transition: background-color ease-in-out 300ms;
          @include btn;
          &:hover {
            background-color: darken($primaryColor, 10%);
          }
          @media (min-width: 1440px) {
            font-size: 20px;
          }
          @media (min-width: 2560px) {
            font-size: 30px;
          }
        }
      }
    }
  }
}
.errorMessage {
    color: darken($primaryColor, 10%);
    font-size: 18px;
    font-weight: bold;
  }
</style>
