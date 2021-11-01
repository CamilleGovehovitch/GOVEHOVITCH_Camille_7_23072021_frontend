<template>
  <section class="profilSection">
    <div class="profilPictureContainer">
      <div class="profilPicture">
        <img :src="userProfile.attachement" alt="photo de profile" v-if="userProfile.attachement !== null" />
        <img src="../assets/images/icon.png" alt="photo de profile" v-else/>

        <input type="file" ref="image" id="image" @change="handleFileUpload()" v-if="edit" />
      </div>
      <div class="btnContainer">
        <div v-if="!edit">
          <button @click="changeEdit" class="editBtn profilBtn">Editer</button>
          <button class="deleteBtn profilBtn" @click="deleteUser">Supprimer</button>
          <button class="logoutBtn profilBtn" @click="logout">Déconnexion</button>
          <router-link to="/">
            <button class="validationBtn profilBtn">Retour</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="profilContentContainer" v-if="userProfile">
      <div v-if="edit">
        <div>
          <div v-for="error of errors" :key="error.message">
            <p>{{ error.field }}:</p>
            <p>{{ error.message }}</p>
          </div>
        </div>

        <form @submit="updateProfile" class="editForm" enctype="multipart/form-data">
          <input
            id="usernameInput"
            v-on:change="checkErrors"
            type="text"
            placeholder="nom d'utilisateur"
            v-model="userProfileForm.username"
            value="test"
          />
          <textarea id="userBio" rows="5" cols="33" placeholder="Courte bio" v-model="userProfileForm.bio"></textarea>
          <button @click="changeEdit" class="editBtn profilBtn">Annuler</button>
          <button class="validationBtn profilBtn" type="submit">Valider</button>
          <button @click="resetForm" type="button" class="profilBtn deleteBtn">Reset</button>
        </form>
      </div>
      <div v-else>
        <h1>Bonjour {{ userProfile.username }}</h1>
        <span>Profile actif depuis le: {{ userSubscriptionDate }}</span>

        <p v-if="!edit">{{ userProfile.bio }}</p>
      </div>
    </div>
  </section>
</template>

<script>
// import { mapState } from "vuex";

export default {
  name: "UserProfile",
  data() {
    return {
      image: "",
      defaultImage: "frontend/src/assets/images/icon.png",
      edit: false,
      test: null,
      userProfileForm: {
        bio: "",
        username: "",
      },
      errors: [],
    };
  },
  async beforeMount() {
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
    userSubscriptionDate() {
      return this.$store.state.userSubscriptionDate;
    },
  },
  methods: {
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },
    changeEdit() {
      this.edit = !this.edit;
    },
    async updateProfile(e) {
      e.preventDefault;

      const username = document.getElementById("usernameInput").value;
      const bio = document.getElementById("userBio").value;
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("username", username);
      formData.append("bio", bio);
      console.log(formData, "FORM DATA");
      const token = localStorage.getItem("token");

      this.axios
        .put("http://localhost:3000/api/user/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          console.log("SUCCESS!!");
          this.changeEdit();
          window.location.href = "/user/profile";
        })
        .catch(() => {
          console.log(formData.bio, formData.username, "FAILURE!!");
        });

      this.errors = [];
    },
    checkErrors(e) {
      console.log(e.target.value);
    },
    resetForm() {
      this.userProfileForm = { ...this.userProfile };
      delete this.userProfileForm.email;
      delete this.userProfileForm.password;
      delete this.userProfileForm.id;
      delete this.userProfileForm.createdAt;
      delete this.userProfileForm.updatedAt;
    },
    async deleteUser() {
      console.log("hello");
      const token = localStorage.getItem("token");
      const response = await this.axios.delete("http://localhost:3000/api/user/delete", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.data) {
        window.location.href = "#/user/login";
        localStorage.clear();
      }
    },
    logout() {
      localStorage.clear();
      window.location.href = "#/user/login";
    },
  },
};
</script>

<style lang="scss">
$lightblueColor: #599bf7;
$primaryColor: #fd2d02;
$validationColor: #4e920e;
$logoutColor: #d6adff;

@mixin profilBtn {
  width: 100%;
  color: black;
  display: block;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px 10px;
  @media (min-width: 1024px) {
    width: 65%;
  }
  @media (min-width: 768px) {
    font-size: 20px;
    width: 50%;
  }
}
.editBtn {
  background-color: $lightblueColor;
  margin: 0 auto 10px auto;
  &:hover {
    background-color: lighten($lightblueColor, 10);
  }
}
.deleteBtn {
  background-color: $primaryColor;
  margin: auto;
  &:hover {
    background-color: lighten($primaryColor, 20);
  }
  @media (min-width: 768px) {
    width: 30%;
  }
}
.validationBtn {
  background-color: $validationColor;
  margin: auto;
  &:hover {
    background-color: lighten($validationColor, 10);
  }
  @media (min-width: 768px) {
    width: 30%;
  }
}
.logoutBtn {
  background-color: $logoutColor;
  margin: auto;
  &:hover {
    background-color: lighten($logoutColor, 10);
  }
}
.profilSection {
  padding: 20px 10px;
  .profilPictureContainer {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .profilPicture {
      width: 50%;
      display: flex;
      flex-direction: column;
      img {
        width: 120px;
        border-radius: 50%;
        margin-bottom: 10px;
        @media (min-width: 1440px) {
          width: 150px;
        }
      }
    }
    .btnContainer {
      width: 50%;
    }
    a {
      text-decoration: none;
    }
    .profilBtn {
      @include profilBtn;
    }
    @media (min-width: 768px) {
      width: 100%;
      align-items: center;
    }
  }
  .profilContentContainer {
    text-align: left;
    h1 {
      font-size: 30px;
      margin-bottom: 20px;
    }
    span {
      display: block;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .profilContent {
      p {
        margin: 0 0 20px 0;
      }
      span {
        font-weight: bold;
      }
      .editInput {
        input {
          border: none;
          border-bottom: solid 1px lightgrey;
        }
      }
    }
    .profilActivity {
      span {
        font-weight: bold;
      }
      p {
        font-size: 16px;
      }
    }
    @media (min-width: 768px) {
      width: 100%;
    }
    .editForm {
      input {
        border: none;
        border-bottom: solid 1px lightgrey;
        margin-bottom: 20px;
      }
    }
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
  }
  form {
    button {
      @include profilBtn;
    }
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
