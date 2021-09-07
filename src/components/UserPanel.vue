<template>
  <section class="userPanel">
    <div class="profileName">
      <h1>{{ title }}</h1>
    </div>
    <div class="profilePictureContainer">
      <router-link to="/user/profile">
        <img :src="userProfile.attachement" alt="photo de profile" v-if="userProfile.attachement !== null" />
        <img src="../assets/images/icon.png" alt="photo de profile" v-else/>
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
    };
  },
  beforeMount() {
    this.$store.dispatch("getUserProfile");
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
  padding: 10px 5px;
  margin-bottom: 15px;
  .profileName {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 20px;
      font-weight: Bold;
      color: $primaryColor;
    }
    h1 {
      color: darken($primaryColor, 10%);
    }
  }
  .profilePictureContainer {
    img {
      width: 100px;
      border-radius: 50%;
    }
  }
}
</style>
