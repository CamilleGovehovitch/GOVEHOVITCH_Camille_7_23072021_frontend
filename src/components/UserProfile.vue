<template>
  <section class="profilSection">
    <div class="profilPictureContainer">
      <div class="profilPicture">
        <router-link to="/">
          <i class="fas fa-arrow-left"> </i>
        </router-link>
        <img :src="userProfile.attachement" alt="photo de profile" v-if="userProfile.attachement !== null"/>
        <img src="../assets/images/icon.png" alt="photo de profile" v-else />
      </div>
      <div class="btnContainer">
        <div v-if="!edit">
          <button @click="changeEdit" class="editBtn profilBtn">Editer</button>
          <button class="deleteBtn profilBtn" @click="deleteUser">Supprimer</button>
        </div>
        <div v-else>
          <button @click="changeEdit" class="editBtn profilBtn">Annuler</button>
          <input type="file" ref="image" id="image" @change="handleFileUpload()" />
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
          <input id="usernameInput" v-on:change="checkErrors" type="text" placeholder="nom d'utilisateur" v-model="userProfileForm.username" />
          <textarea id="userBio" rows="5" cols="33" placeholder="Courte bio" v-model="userProfileForm.bio"></textarea>
          <button class="validationBtn profilBtn" type="submit">Valider</button>
          <button @click="resetForm" type="button" class="profilBtn deleteBtn">Reset</button>
        </form>
      </div>
      <div v-else>
        <h1>Bonjour {{ userProfile.username }}</h1>
        <span>Profile actif depuis le: {{ userProfile.createdAt }}</span>

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
      edit: false,
      userProfileForm: {
        bio: "",
        username: "",
      },
      errors: [],
    };
  },
  async beforeMount() {
    this.$store.dispatch("getUserProfile");
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
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
  },
};
</script>

<style lang="scss">
$lightblueColor: #3e8af7;
$primaryColor: #fd2d02;
$validationColor: #4e920e;

@mixin profilBtn {
  width: 100%;
  color: white;
  display: block;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px 10px;
}
.editBtn {
  background-color: $lightblueColor;
  margin: 0 auto 10px auto;
  &:hover {
    background-color: darken($lightblueColor, 10);
  }
}
.deleteBtn {
  background-color: $primaryColor;
  margin: auto;
  &:hover {
    background-color: darken($primaryColor, 10);
  }
}
.validationBtn {
  background-color: $validationColor;
  margin: auto;
  &:hover {
    background-color: lighten($validationColor, 10);
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
      img {
        width: 120px;
        border-radius: 50%;
      }
    }
    .btnContainer {
      width: 50%;
    }
    .profilBtn {
      @include profilBtn;
    }
    @media (min-width: 768px) {
      width: 50%;
      flex-direction: column;
      align-items: center;
    }
  }
  .profilContentContainer {
    text-align: left;
    h1 {
      font-size: 30px;
    }
    span {
      display: block;
      font-size: 18px;
      margin-bottom: 5px;
    }
    .profilContent {
      p {
        margin: 0 0 10px 0;
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
      width: 50%;
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
}
</style>
