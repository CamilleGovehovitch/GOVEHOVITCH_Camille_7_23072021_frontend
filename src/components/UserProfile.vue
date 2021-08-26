<template>
  <section class="profilSection">
    <div class="profilPictureContainer">
      <!-- <div class="profilPicture">
        <img src="../assets/images/palpatine.jpg" alt="photo de profile" />
      </div> -->
      <div>
        <div v-if="!edit">
          <button @click="changeEdit" class="editBtn profilBtn">Editer</button>
          <button class="deleteBtn profilBtn">Supprimer</button>
        </div>
        <button v-else @click="changeEdit" class="validationBtn profilBtn">Valider</button>
      </div>
    </div>
    <div class="profilContentContainer" v-if="userProfile">
      <div v-if="edit">
        <form action="">
          <input type="text" placeholder="nom d'utilisateur" :value="userProfile.username" />
          <textarea id="story" name="story" rows="5" cols="33" placeholder="Courte bio" :value="userProfile.bio"></textarea>
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
      userProfile: null,
      edit: false,
    };
  },
  async beforeMount() {
    const response = await this.getProfile();
    this.userProfile = response.data;
    return;
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
  },
};
</script>

<style lang="scss">
$lightblueColor: #3e8af7;
$primaryColor: #fd2d02;
$validationColor: #4e920e;

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
    .profilPicture {
      width: 50%;
      img {
        width: 120px;
        border-radius: 50%;
      }
    }
    .profilBtn {
      color: white;
      display: block;
      border: none;
      border-radius: 10px;
      margin-bottom: 20px;
      padding: 10px 5px;
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
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
  }
}
</style>
