import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";
import RouteName from "../utilities/route-names";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RouteName.INDEX,
      name: RouteName.INDEX,
      component: WelcomeView,
    },
    {
      path: RouteName.LOGIN,
      name: RouteName.LOGIN,
      component: () => import("../views/auth/LoginView.vue"),
    },
  ],
});

export default router;
