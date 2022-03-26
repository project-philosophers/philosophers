import * as vueRouter from "vue-router";

// import Index from './pages/index.vue';

import Philosophers from "./pages/philosophers.vue";

import Register from "./pages/users/register.vue";
import Login from "./pages/users/login.vue";

import Graph from "./components/Graph.vue";

import Tags from "./components/Tags.vue";
import Languages from "./pages/tags/languages.vue";


import Search from "./components/Search.vue";

import World from './components/graphs/GraphMap.vue'

const Home = { template: '<div>Home</div>' }

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/philosophers",
    name: "Philosophers",
    component: Philosophers,
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
    path: "/graph",
    name: "Graph",
    component: Graph,
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
    path: "/search",
    name: "Search",
    component: Search,
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