import { createRouter, createWebHistory } from "vue-router";

import MazeView from "@/views/MazeView.vue"
import RegisterView from "@/views/RegisterView.vue"


const routes = [
  {
    path: "/",
    redirect: { name: 'maze' }
  },
  {
    path: "/maze",
    name: "maze",
    component: MazeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router