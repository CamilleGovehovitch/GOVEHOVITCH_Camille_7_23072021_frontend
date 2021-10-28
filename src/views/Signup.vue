<template>
  <div>
    <SignupComponent :email="email" :password="password" :title="title" @subscription-data="userSubscription"/>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="error" v-for="error in errors" :key="error">{{ error }}</p>
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
    return {
      email: "Email",
      password: "Password",
      title: "GROUPOMANIA",
      errorMessage: "",
      newUser: null,
      errors: [],
    };
  },
  props: {},
  methods: {
    // validationInput(e, payload) {
    //   e.preventDefault();
    //   const userEmail = payload.userEmail;
    //   const userPassword = payload.userPassword;
    //   const confirmPassword = payload.confirmPassword;
    //   const emailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$");

    //   if (userEmail === "" || userPassword === "" || confirmPassword === "") {
    //     return (this.errorEmptyMessage = true);
    //   }
    //   if (!emailRegExp.test(userEmail)) {
    //     return (this.errorMatchEmail = true);
    //   }
    //   if (confirmPassword !== userPassword) {
    //     return (this.errorUnmatchMessage = true);
    //   }
    //   this.userSubscription(payload);
    // },
    userSubscription( payload) {
      const bodyReq = {
        email: payload.userEmail,
        password: payload.userPassword,
      };

      this.axios
        .post("http://localhost:3000/api/user/signup", bodyReq, {
          headers: {
            Accept: "application/json",
          },
        })
        .then((newUser) => {
          this.errorMessage = "";
          this.newUser = newUser.data;
          window.location.href = "#/user/login";
        })
        .catch((error) => {
          this.errors = [];
          this.errors.push(error.response.data.error);
          this.errorMessage = error.response.data.message;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
$primaryColor: #fd2d02;
.error {
  color: darken($primaryColor, 10%);
  font-weight: bold;
  font-size: 18px;
}
</style>
