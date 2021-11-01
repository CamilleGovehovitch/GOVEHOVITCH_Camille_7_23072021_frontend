<template>
  <section class="userPanel">
    <router-link to="/">
      <div class="profileName">
        <h1>{{ title }}</h1>
      </div>
    </router-link>

    <div class="profilePictureContainer">
      <router-link to="/user/profile">
        <img :src="userProfile.attachement" alt="photo de profile" v-if="userProfile.attachement !== null" />
        <img src="../assets/images/icon.png" alt="photo de profile" v-else />
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserPanel",
  data() {
    return {
      title: "GROUPOMANIA",
      logo: {
        src: "../assets/images/icon-left-font.png",
        alt: "logo groupomania",
      },
    };
  },
  beforeMount() {
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
$primaryColor: #fd2d02;

.userPanel {
  background-color: lighten($primaryColor, 45%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 15px;
  position: fixed;
  z-index: 999;
  width: 100%;
  a {
    text-decoration: none;

    .profileName {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      span {
        font-size: 20px;
        font-weight: Bold;
        color: $primaryColor;
      }
      h1 {
        color: darken($primaryColor, 10%);
        font-weight: bold;
        transition: color 300ms ease-in-out;
        &:hover {
          color: darken($primaryColor, 30);
        }
        @media (min-width: 768px) {
          font-size: 20px;
        }
        @media (min-width: 1024px) {
          font-size: 25px;
        }
        @media (min-width: 1440px) {
          font-size: 30px;
        }
        @media (min-width: 2560px) {
          font-size: 45px;
        }
      }
    }
  }
  .profilePictureContainer {
    padding: 10px;
    img {
      width: 100px;
      border-radius: 50%;
      transition: box-shadow 300ms ease-in-out;
      @media (min-width: 1440px) {
        width: 120px;
      }
      &:hover {
        box-shadow: 2px 1px 15px 0px rgba(0, 0, 0, 0.7);
      }
    }
  }
}
</style>
