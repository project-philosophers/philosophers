import * as vueRouter from "vue-router";

import Home from './pages/home.vue';

import Philosophers from './pages/philosophers.vue';
import PhPage from './pages/philosophers/_id.vue';
import Literature from './pages/literature.vue';

import User from "./pages/users/_id.vue";
import Register from "./pages/users/register.vue";
import Login from "./pages/users/login.vue";

import TagsPanel from "./components/TagsPanel.vue";

import World from './components/graphs/GraphMap.vue'

import NotFound from './components/NotFound.vue';

const routes = [
  { path: "/", name: "Index", component: Home },
  { path: "/home", name: "Home", component: Home },
  { path: "/philosophers", name: "Philosophers", component: Philosophers },
  { path: "/philosophers/:id", name: "PhPage", component: PhPage },
  { path: "/literature", name: "Literature", component: Literature },
  { path: "/users/:id", name: "User", component: User },
  { path: "/users/register", name: "Register", component: Register },
  { path: "/users/login", name: "Login", component: Login },
  { path: "/tags", name: "TagsPanel", component: TagsPanel },
  { path: "/graph/world", name: "World", component: World },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes: routes
});
export default router;