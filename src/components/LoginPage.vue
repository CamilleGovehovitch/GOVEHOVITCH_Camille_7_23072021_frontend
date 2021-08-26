<template>
  <!-- Page de connection -->
  <div class="parentContainer">
    <div class="logoContainer">
      <img src="../assets/images/icon-above-font.png" alt="logo groupomania" />
    </div>
    <!-- Formulaire de connection -->
    <div class="loginContainer">
      <form method="POST">
        <div class="emailContainer">
          <label for="email">Email</label>
          <input id="userEmail" type="email" placeholder="exemple@exemple.com" />
        </div>
        <div class="passwordContainer">
          <label for="password">Password</label>
          <input id="userPassword" type="password" placeholder="**********" />
        </div>
        <div class="submitBtn">
          <input type="submit" value="Se connecter" @click="connection" />
        </div>
      </form>
    </div>
    <!-- Lien d'inscription -->
    <div class="signupContainer">
      <a>
        <router-link to="/user/signup">Pas encore de compte?</router-link>
      </a>
    </div>
    <div id="errorMessageContainer" v-if="errorMessage">
      <p class="errorMessage">hey</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      image: {
        path: "../assets/images/icon-above-font.png",
        alt: "hey",
      },
      emailRegExp: "^[a-z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$",
      errorMessage: false,
      apUrl: "http://localhost:3000/api",
    };
  },
  props: {
    title: String,
  },
  methods: {
    connection(e) {
      e.preventDefault();
      const userEmail = document.getElementById("userEmail").value;
      const userPassword = document.getElementById("userPassword").value;
      const emailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$");

      if (!emailRegExp.test(userEmail)) {
        console.log("perdu");
        return (this.errorMessage = true);
      }

      let dataBody = {
        email: userEmail,
        password: userPassword,
      };
      console.log(JSON.stringify(dataBody));
      let loginReq = new XMLHttpRequest();
      loginReq.open("POST", "http://localhost:3000/api/user/login", true);
      loginReq.onreadystatechange = () => {
        if (loginReq.readyState === 4 && loginReq.status === 200) {
          const response = JSON.parse(loginReq.responseText);
          console.log(response);
          localStorage.setItem('token', response.token);
        } else {
          console.log(loginReq);
        }
      };
      loginReq.setRequestHeader("Accept", "application/json");
      loginReq.setRequestHeader("Content-Type", "application/json");
      loginReq.send(JSON.stringify(dataBody));
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
    }
    @media (min-width: 768px) {
      width: 60%;
      margin: auto;
    }
  }
  .loginContainer {
    margin-bottom: 30px;
    form {
      label {
        color: $primaryColor;
        font-size: 20px;
        font-weight: bold;
        display: block;
        margin: 0 10px 10px 0;
        @media (min-width: 1024px) {
          font-size: 30px;
        }
        @media (min-width: 2560px) {
          font-size: 40px;
        }
      }
      input {
        margin-bottom: 10px;
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
        }
        @media (min-width: 2560px) {
          height: 60px;
        }
      }
      .submitBtn {
        height: 30px;
        input {
          background: $primaryColor;
          height: 100%;
          color: white;
          font-size: 16px;
          font-weight: bold;
          @media (min-width: 1024px) {
            font-size: 25px;
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
    a {
      color: $primaryColor;
      font-weight: bold;
      text-decoration: none;
    }
  }
  .errorMessage {
    color: $primaryColor;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
