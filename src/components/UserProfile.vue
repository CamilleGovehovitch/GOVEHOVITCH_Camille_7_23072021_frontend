<template>
  <section class="profilSection">
    <div class="profilPictureContainer">
      <div class="profilPicture">
        <router-link to="/">
          <i class="fas fa-arrow-left"> </i>
        </router-link>
        <img :src="userProfile.attachement" alt="photo de profile" />
      </div>
      <div class="btnContainer">
        <div v-if="!edit">
          <button @click="changeEdit" class="editBtn profilBtn">Editer</button>
          <button class="deleteBtn profilBtn">Supprimer</button>
        </div>
        <div v-else>
          <button @click="changeEdit" class="editBtn profilBtn">Annuler</button>
          <input type="file" />
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
        <form @submit="updateProfile" class="editForm">
          <input id="usernameInput" v-on:change="checkErrors" type="text" placeholder="nom d'utilisateur" v-model="userProfileForm.username" />
          <textarea id="story" name="story" rows="5" cols="33" placeholder="Courte bio" v-model="userProfileForm.bio"></textarea>
          <button class="validationBtn profilBtn" type="submit">Valider</button>
          <button @click="resetForm" type="button" class="profilBtn deleteBtn">Reset</button>
        </form>
      </div>
      <div v-else>
        <h1>{{ userProfile.username }}</h1>
        <span>{{ userProfile.createdAt }}</span>
        <p v-if="!edit">{{ userProfile.bio }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      userProfile: {
        attachement: null,
      },
      edit: false,
      userProfileForm: null,
      errors: [],
    };
  },
  async beforeMount() {
    const response = await this.getProfile();
    this.userProfile = response.data;
    this.resetForm();
  },
  computed: {},
  methods: {
    changeEdit() {
      this.edit = !this.edit;
    },
    async getProfile() {
      const token = localStorage.getItem("token");
      return this.axios.get("http://localhost:3000/api/user/profile", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    async updateProfile(e) {
      e.preventDefault;
      this.errors = [];
      if (this.userProfileForm.username.length < 3) {
        this.errors.push({
          field: "username",
          message: "too short",
        });
        console.log(this.errors);
      }
      if (this.errors.length < 1) {
        try {
          const token = localStorage.getItem("token");
          console.log(this.userProfileForm);
          const body = { ...this.userProfileForm };

          const response = await this.axios.put("http://localhost:3000/api/user/profile", body, {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          });
          if (response.data) {
            this.userProfile = response.data;
            this.changeEdit();
          }
        } catch (err) {
          console.log(err);
        }
      }
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
  padding: 10px 5px;
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
