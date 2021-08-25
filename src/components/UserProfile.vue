<template>
  <section class="profilSection">
    <div class="profilPictureContainer">
      <div class="profilPicture">
        <img src="../assets/images/palpatine.jpg" alt="photo de profile" />
      </div>
      <div class="profilEditBtn" v-if="edit === false">
        <button id="editBtn" v-on:click="changeEdit">
          <a>
            <router-link to="/user/:id/profile/edit">Editer votre profile</router-link>
          </a>
        </button>
        <button id="deleteBtn">Supprimer votre profile</button>
      </div>
      <div class="profilEditBtn" v-else>
        <button id="validationBtn" v-on:click="changeEdit">
          <a>
            <router-link to="/user/:id/profile/">Valider les modifications</router-link>
          </a>
        </button>
      </div>
    </div>
    <div class="profilContentContainer">
      <div class="profilInfos">
        <h1>{{ userProfil.firstName }} {{ userProfil.name }}</h1>
        <span>{{ userProfil.subscriptionDate }}</span>
        <span>{{ userProfil.job }}</span>
      </div>
      <div class="profilContent">
        <span>Nom d'utilisateur</span>
        <p>{{ userProfil.userName }}</p>
        <div v-if="edit === true" class="editInput">
          <input type="text" placeholder="nom d'utilisateur" />
        </div>
        <span>BIO:</span>
        <p>{{ userProfil.bio }}</p>
        <div v-if="edit === true" class="editInput">
          <textarea
            id="story"
            name="story"
            rows="5"
            cols="33"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim sagittis suscipit."
          ></textarea>
        </div>
      </div>
      <div class="profilActivity" v-if="edit === false">
        <p><span>Dernier sujet:</span> {{ userProfil.dataDb.lastPost }}</p>
        <p><span>Dernier message:</span> {{ userProfil.dataDb.lastMessage }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      userProfil: {
        name: "Palpatine",
        firstName: "Sheev",
        userName: "EDF",
        subscriptionDate: "11/11/1111",
        job: "Empereur",
        bio: "J'aime la peinture, les popcorns et découvrir de nouveaux talents",
        dataDb: {
          lastPost: "Des Frites à la cantine",
          lastMessage: "Oui mais cuite façon Belge!",
        },
      },
      edit: false,
    };
  },
  computed: {},
  methods: {
    changeEdit() {
      if (this.edit === true) {
        return (this.edit = false);
      }
      if (this.edit === false) {
        return (this.edit = true);
      }
    },
    prout() {
      console.log("prout");
    },
  },
};
</script>

<style lang="scss">
$lightblueColor: #3e8af7;
$primaryColor: #fd2d02;
$validationColor: #4e920e;

#editBtn {
  background-color: $lightblueColor;
  margin: 0 auto 10px auto;
  &:hover {
    background-color: darken($lightblueColor, 10);
  }
}
#deleteBtn {
  background-color: $primaryColor;
  margin: auto;
  &:hover {
    background-color: darken($primaryColor, 10);
  }
}
#validationBtn {
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
    .profilEditBtn {
      width: 50%;
      button {
        color: white;
        display: block;
        border: none;
        border-radius: 10px;
        margin-bottom: 20px;
        padding: 10px 5px;
        a {
          color: white;
          text-decoration: none;
        }
      }
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
