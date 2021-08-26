import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/Login.vue";
import SignupComponent from "../views/Signup.vue";
import UserProfile from "../views/User.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/user/signup",
    name: "Signup",
    component: SignupComponent,
  },
  {
    path: "/user/profile",
    name: "User",
    component: UserProfile
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
