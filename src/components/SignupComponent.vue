<template>
  <div>
    <section class="signupSection">
      <div class="titlecontainer">
        <!-- <img src="../assets/images/icon-above-font.png" alt="logo groupomania" /> -->
        <h1 class="title">Inscription {{ title }}</h1>
      </div>
      <div>
        <form action="" class="signupForm">
          <div class="emailContainer">
            <label for="userEmail">{{ email }}*</label>
            <input id="userEmail" type="email" placeholder="exemple@exemple.com" />
          </div>
          <div>
            <div class="passwordContainer">
              <label for="userPassword">{{ password }}*</label>
              <input id="userPassword" type="password" placeholder="mot de passe" />
            </div>
            <div class="passwordContainer">
              <label for="confirmPassword">Confirmez votre {{ password }}*</label>
              <input id="confirmPassword" type="password" placeholder="confirmer votre mot de passe" />
            </div>
          </div>
          <div>
            <button @click="validationInput" class="submitBtn">Inscrivez-vous</button>
          </div>
          <div></div>
        </form>
        <p class="infos">Les champs marqués d'une astérix sont obligatoires</p>
        <p class="infos">Le password doit comporter 10 caractères dont un caractère spéciale, une majuscule et au moins chiffre</p>
      </div>
      <div class="loginLinkContainer">
        <a>
          <router-link to="/user/login">Vous avez déjà un compte?</router-link>
        </a>
      </div>
      <div class="errorMessage">
        <span v-if="errorEmptyMessage"> Les champs "EMAIL" et "PASSWORD" doivent être remplis</span>
        <!-- <span v-if="errorUnmatchMessage">Le mot de passe et la confirmation du mot de passe sont différents.</span>
        <span v-if="errorMatchEmail">L'email n'a pas la forme requise.</span> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "SignupComponent",
  data() {
    return {
      errorEmptyMessage: false,
      errorUnmatchMessage: false,
      errorMatchEmail: false,
    };
  },
  props: {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  methods: {
    validationInput() {
      const userEmail = document.getElementById("userEmail").value;
      const userPassword = document.getElementById("userPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const emailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$");

      if (userEmail === "" || userPassword === "" || confirmPassword === "") {
        return (this.errorEmptyMessage = true);
      }
      if (!emailRegExp.test(userEmail)) {
        return (this.errorMatchEmail = true);
      }
      if (confirmPassword !== userPassword) {
        return (this.errorUnmatchMessage = true);
      }
      this.emitSubscriptionData();
      // this.userSubscription();
    },
    // userSubscription(userEmail, userPassword) {
    //   // event.preventDefault();
    //   const bodyReq = {
    //     email: userEmail,
    //     password: userPassword,
    //   };

    //   this.axios
    //     .post("http://localhost:3000/api/user/signup", bodyReq, {
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     })
    //     .then((newUser) => {
    //       this.errorMessage = "";
    //       this.newUser = newUser.data;
    //       window.location.href = "#/user/login";
    //     })
    //     .catch((error) => {
    //       this.errors = [];
    //       this.errors.push(error.response.data.error);
    //       this.errorMessage = error.response.data.message;
    //     });
    // },
    emitSubscriptionData() {
      const userEmail = document.getElementById("userEmail").value;
      const userPassword = document.getElementById("userPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      this.$emit("subscription-data", {
        userEmail: userEmail,
        userPassword: userPassword,
        confirmPassword: confirmPassword,
      });
    },
  },
};
</script>

<style lang="scss">
$primaryColor: #fd2d02;

@mixin inputForm {
  border: none;
  border-bottom: solid 1px lightgrey;
  border-radius: 5px;
  width: 80%;
  margin-bottom: 20px;
  padding: 10px 5px;
  &::placeholder {
    padding-left: 10px;
    @media (min-width: 1024px) {
      font-size: 18px;
    }
    @media (min-width: 1440px) {
      font-size: 20px;
    }
  }
}
@mixin labelForm {
  display: block;
  color: darken($primaryColor, 10%);
  font-weight: bold;
  @media (min-width: 1024px) {
    font-size: 20px;
  }
  @media (min-width: 1440px) {
    font-size: 25px;
  }
}

.signupSection {
  .titlecontainer {
    padding: 20px 10px;
    .title {
      color: darken($primaryColor, 10%);
      font-weight: bold;
      font-size: 25px;
      margin-top: 0;
      margin-bottom: 30px;
      @media (min-width: 1024px) {
        font-size: 35px;
      }
    }
  }
  .signupForm {
    label {
      @include labelForm;
    }
    input {
      @include inputForm;
    }
    .submitBtn {
      background: darken($primaryColor, 10%);
      color: white;
      font-size: 16px;
      font-weight: bold;
      padding: 10px;
      border: none;
      border-radius: 5px;
      margin-bottom: 20px;
      transition: background-color ease-in-out 300ms;
      &:hover {
        background-color: $primaryColor;
      }
      @media (min-width: 1440px) {
        font-size: 20px;
      }
    }
  }
  .loginLinkContainer {
    margin-bottom: 20px;
    a {
      text-decoration: none;
      color: darken($primaryColor, 10%);
      font-size: 16px;
      font-weight: bold;
      @media (min-width: 1440px) {
        font-size: 25px;
      }
    }
  }
  @media (min-width: 1024px) {
    padding: 50px 20px;
  }
}
.infos {
  color: darken($primaryColor, 10%);
  margin-bottom: 10px;
}
.errorMessage {
  color: darken($primaryColor, 10%);
  font-size: 20px;
  font-weight: bold;
}
</style>
