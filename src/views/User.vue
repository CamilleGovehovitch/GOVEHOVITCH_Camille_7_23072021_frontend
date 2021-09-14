<template>
    <div>
        <UserProfile/>
    </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue";

export default {
  name: "User",
  components: {
    UserProfile,
  },
  beforeMount() {
    this.checkToken();
  },
  methods: {
    checkToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("empty token");
        return (window.location.href = "#/user/login");
      }
    },
  },
};
</script>

<style scoped>

</style>