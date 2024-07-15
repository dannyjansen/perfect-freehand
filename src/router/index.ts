import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Sketch = () => import("../views/Sketch.vue");

const routes: RouteRecordRaw[] = [];

routes.push({ path: "/", name: "Sketch", component: Sketch });

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (!to && !from) console.log({ savedPosition });
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // console.log({ to, from });
  if (!to && !from) console.log("Initial route");
  next();
});

export default router;
