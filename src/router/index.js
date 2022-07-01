import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/TicketListView.vue"),
      beforeEnter: async () => {
        const store = useUserStore();
        if (!store.isAuthentificated) {
          await store.getUser();
          if (!store.isAuthentificated) {
            return { name: "login" };
          }
        }
      },
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter: () => {
        const store = useUserStore();
        store.user = null;
      },
      redirect: "/login",
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
