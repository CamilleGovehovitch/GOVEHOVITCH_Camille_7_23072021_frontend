<template>
  <div class="home">
    <LoginPage 
      email="Email" 
      password="Password"
      errorMassage="false"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from "@/components/LoginPage.vue";

export default {
  name: "Login",
  components: {
    LoginPage,
  },  
};
</script>
