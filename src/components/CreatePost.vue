<template>
  <div>
    <div class="header">
      <img src="../assets/images/icon.png" alt="" />
      <h1>{{ title }}</h1>
    </div>
    <div class="newPostContainer">
      <form action="">
        <label for="postTitle"> Titre</label>
        <input type="text" id="postTitle" placeholder="Lorem Ipsum" v-model="title" />
        <label for="postContent">Contenu</label>
        <textarea id="postContent" rows="10"></textarea>
        <div class="uploadFileContainer">
          <input type="file" id="image" ref="image" class="fileContent" @change="handleFileUpload" />
        </div>
        <div class="btnContainer">
          <div>
            <button type="submit" class="validationBtn" @click="createPost">Envoyer</button>
          </div>
          <div>
            <router-link to="/">
              <button class="cancelBtn">Annuler</button>
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  data() {
    return {
      title: "Créé votre post",
      image: "",
    };
  },
  methods: {
    async createPost(e) {
      e.preventDefault();
      console.log("hello");
      const title = document.getElementById("postTitle").value;
      const content = document.getElementById("postContent").value;

      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", title);
      formData.append("content", content);
      console.log(formData);
      this.axios
        .post("http://localhost:3000/api/post/new", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          console.log("success");
          window.location.href = "/";
        })
        .catch((error) => {
          console.log("error", error);
        });

      //   return this.axios.post(
      //     "http://localhost:3000/api/post/new",
      //     {},
      //     {
      //       headers: {
      //         Accept: "application/json",
      //         Authorization: "Bearer " + token,
      //       },
      //     }
      //   );
    },
    handleFileUpload() {
      console.log(this.$refs.image.files[0]);
      this.image = this.$refs.image.files[0];
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
      width: 40%;
    }
    @media (min-width: 2560px) {
      width: 30%;
    }
  }
  h1 {
    color: darken($primaryColor, 10%);
    margin: 0;
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
</style>
