<template>
  <!-- Page de connection -->
  <div class="parentContainer">
    <div class="logoContainer">
      <img src="../assets/images/icon-above-font.png" alt="logo groupomania" />
    </div>
    <!-- Formulaire de connection -->
    <section class="loginContainer">
      <h1>Connectez-vous</h1>
      <form method="POST">
        <div class="emailContainer">
          <label for="userEmail">{{ email }}</label>
          <input id="userEmail" type="email" placeholder="exemple@exemple.com" />
        </div>
        <div class="passwordContainer">
          <label for="userPassword">{{ password }}</label>
          <input id="userPassword" type="password" placeholder="**********" />
        </div>
        <div class="submitBtn">
          <input type="submit" value="Se connecter" @click="connection" />
        </div>
      </form>
    </section>
    <!-- Lien d'inscription -->
    <div class="signupContainer">
      <router-link to="/user/signup">Pas encore de compte?</router-link>
    </div>
    <div id="errorMessageContainer">
      <!-- <p v-if="errorMessage" class="errorMessage">L'email n'a pas la forme requise</p>
      <p v-if="loginErrorMessage" class="errorMessage">{{ loginErrorMessage }}</p> -->
      <p v-for="error in errors" :key="error" class="errorMessage">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  beforeMount() {
    this.$store.commit("LOADING_SPINNER_SHOW_MUTATION", false);
  },
  data() {
    return {
      image: {
        path: "../assets/images/icon-above-font.png",
      },
      emailRegExp: "^[a-z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$",
      errors: [],
      apUrl: "http://localhost:3000/api",
    };
  },
  props: {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  methods: {
    connection(e) {
      e.preventDefault();
      const userEmail = document.getElementById("userEmail").value;
      const userPassword = document.getElementById("userPassword").value;
      const emailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$");
      if (userEmail === "" || userPassword === "") {
        this.errors = [];
        this.errors.push("L'email et/ou le mot de passe doivent être renseignés");
      }
      if (!emailRegExp.test(userEmail)) {
        this.errors.push("L'email n'a pas la forme requise");
      }
      let dataBody = {
        email: userEmail,
        password: userPassword,
      };
      this.axios
        .post("http://localhost:3000/api/user/login", dataBody, {
          headers: {
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          this.errors = [];
          localStorage.setItem("token", response.data.token);
          window.location.href = "/";
        })
        .catch((error) => {
          this.errors = [];
          this.errors.push(error.response.data.error);
        });
    },
  },
};
</script>

<style lang="scss">
$primaryColor: #fd2d02;

.parentContainer {
  width: 100%;
  .logoContainer {
    img {
      width: 100%;
      @media (min-width: 425px) {
        width: 65%;
      }
      @media (min-width: 768px) {
        width: 80%;
      }
      @media (min-width: 768px) {
        width: 40%;
      }
    }
    @media (min-width: 768px) {
      width: 60%;
      margin: auto;
    }
  }
  .loginContainer {
    margin-bottom: 30px;
    h1 {
      color: darken($primaryColor, 10%);
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      @media (min-width: 1024px) {
        font-size: 20px;
      }
      @media (min-width: 1440px) {
        font-size: 35px;
      }
      @media (min-width: 2560px) {
        font-size: 40px;
      }
    }
    form {
      label {
        color: darken($primaryColor, 10%);
        font-size: 20px;
        font-weight: bold;
        display: block;
        margin: 0 10px 10px 0;
        @media (min-width: 1024px) {
          font-size: 20px;
        }
        @media (min-width: 2560px) {
          font-size: 40px;
        }
      }
      input {
        margin-bottom: 20px;
        height: 20px;
        width: 80%;
        border: none;
        border-radius: 5px;
        padding-left: 10px;
        &::placeholder {
          padding-left: 10px;
        }
        @media (min-width: 1024px) {
          height: 30px;
          font-size: 20px;
        }
        @media (min-width: 2560px) {
          height: 60px;
          font-size: 40px;
        }
      }
      .submitBtn {
        height: 30px;
        input {
          background: darken($primaryColor, 10%);
          height: 100%;
          color: white;
          font-size: 16px;
          font-weight: bold;
          transition: background-color ease-in-out 300ms;
          @media (min-width: 1024px) {
            font-size: 25px;
          }
          @media (min-width: 1440px) {
            font-size: 30px;
          }
          @media (min-width: 2560px) {
            font-size: 40px;
            height: 50px;
          }
          &:hover {
            background-color: $primaryColor;
          }
        }
        @media (min-width: 1024px) {
          height: 35px;
        }
      }
    }
    @media (min-width: 768px) {
    }
  }
  .signupContainer {
    margin-bottom: 20px;
    a {
      color: darken($primaryColor, 10%);
      font-size: 18px;
      font-weight: bold;
      text-decoration: none;
      transition: color ease-in-out 300ms;
      &:hover {
        color: $primaryColor;
      }
      @media (min-width: 2560px) {
        font-size: 40px;
      }
    }
  }
  .errorMessage {
    color: darken($primaryColor, 10%);
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
