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
    {
      path: RouteName.REGISTER,
      name: RouteName.REGISTER,
      component: () => import("../views/auth/RegisterView.vue"),
    },
    {
      path: RouteName.USER_PROFILE,
      name: RouteName.USER_PROFILE,
      component: () => import("../views/users/UserProfile.vue"),
    },
    {
      path: `${RouteName.SINGLE_PRODUCT}/:productId`,
      name: RouteName.SINGLE_PRODUCT,
      component: () => import("../views/products/ProductDetail.vue"),
    },
  ],
});

export default router;
