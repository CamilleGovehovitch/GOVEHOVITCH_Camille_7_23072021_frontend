import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import User from "../views/User.vue";
import Create from "../views/Create.vue";
import Home from "../views/Home.vue";
import test from '../views/test.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/test",
    name: "test",
    component: test,
  },
  {
    path: "/user/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/user/profile",
    name: "User",
    component: User,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/post/new",
    name: "Create",
    component: Create
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
