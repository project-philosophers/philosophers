import * as vueRouter from "vue-router";
import Philosophers from "./pages/Philosophers.vue"

const Home = { template: '<div>Home</div>' }

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ph",
    name: "Philosophers",
    component: Philosophers,
  }
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes: routes
});
export default router;