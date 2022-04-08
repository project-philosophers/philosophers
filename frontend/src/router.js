import * as vueRouter from "vue-router";


import Philosophers from './pages/philosophers.vue';
import Literature from './pages/literature.vue';

import User from "./pages/users/_id.vue";
import Register from "./pages/users/register.vue";
import Login from "./pages/users/login.vue";

import Tags from "./components/Tags.vue";
import Languages from "./pages/tags/languages.vue";

import World from './components/graphs/GraphMap.vue'

// const Home = { template: '<div>Home</div>' }

const routes = [
  // {
  //   path: "/",
  //   name: "Index",
  //   component: Index,
  // },
  {
    path: "/philosophers",
    name: "Philosophers",
    component: Philosophers,
  },
  {
    path: "/literature",
    name: "Literature",
    component: Literature,
  },
  {
    path: "/users/:id",
    name: "User",
    component: User,
  },
  {
    path: "/users/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/users/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/tags",
    name: "Tags",
    component: Tags,
  },
  {
    path: "/tags/languages",
    name: "Languages",
    component: Languages,
  },
  {
    path: "/graph/world",
    name: "World",
    component: World,
  }
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes: routes
});
export default router;