<template>
  <div>
    <SignupComponent email="Email" password="Password" title="GROUPOMANIA" @subscription-data="userSubscription" />
  </div>
</template>

<script>
import SignupComponent from "@/components/SignupComponent.vue";

export default {
  name: "Signup",
  components: {
    SignupComponent,
  },
  data() {
    return {};
  },
  methods: {
    async userSubscription(payload) {
      console.log("hello");

      const bodyReq = {
        email: payload.userEmail,
        password: payload.userPassword,
      };

      const response = await this.axios.post("http://localhost:3000/api/user/signup", bodyReq, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log(response.data);
      if (response.data.userId) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/user/login";
      }
    },
  },
};
</script>
