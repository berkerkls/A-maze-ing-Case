import { createRouter, createWebHistory } from "vue-router";

import MazeView from "@/views/MazeView.vue"
import RegisterView from "@/views/RegisterView.vue"
import MazeComponent from "@/components/MazeComponent.vue"


const routes = [
  {
    path: "/",
    redirect: { name: 'mazelist' }
  },
  {
    path: "/mazelist",
    name: "mazelist",
    component: MazeView,
  },
  {
    path: "/maze",
    name: "maze",
    component: MazeComponent
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