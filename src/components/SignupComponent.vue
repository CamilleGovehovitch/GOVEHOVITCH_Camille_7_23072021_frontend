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
            <label for="userEmail">{{ email }}</label>
            <input type="email" placeholder="exemple@exemple.com" />
          </div>
          <div>
            <div class="passwordContainer">
              <label for="userPassword">{{ password }}</label>
              <input type="text" placeholder="mot de passe" />
            </div>
            <div class="passwordContainer">
              <label for="">Confirmez votre {{ password }}</label>
              <input type="text" placeholder="confirmer votre mot de passe" />
            </div>
          </div>
          <div>
            <input type="submit" class="submitBtn" value="S'inscire" />
          </div>
          <div></div>
        </form>
      </div>
      <div class="loginLinkContainer">
        <a>
          <router-link to="/user/login">Vous avez déjà un compte?</router-link>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "SignupComponent",
  data() {
    return {
      title: "Groupomania",
      email: "Email",
      password: "Password",
    };
  },
  props: {
    msg: {
      type: String,
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
  }
}
@mixin labelForm {
  display: block;
  color: $primaryColor;
  font-weight: bold;
  @media (min-width: 1024px) {
    font-size: 20px;
  }
}

.signupSection {
  .titlecontainer {
    padding: 20px 10px;
    .title {
      color: $primaryColor;
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
      background-color: $primaryColor;
      color: white;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .loginLinkContainer {
    a {
      text-decoration: none;
      color: $primaryColor;
      font-size: 16px;
      font-weight: bold;
    }
  }
  @media (min-width: 1024px) {
    padding: 50px 20px;
  }
}
</style>
