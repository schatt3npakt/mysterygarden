import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GardenView from "../views/GardenView.vue";
import AlmanachView from "../views/AlmanachView.vue";
import TasksView from "../views/TasksView.vue";
import WinView from "../views/WinView.vue";
import HowToPlayView from "../views/HowToPlayView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    title: "Almanach",
    icon: require("@/assets/ui/icon-book.png"),
    path: "/almanach",
    name: "almanach",
    component: AlmanachView,
  },
  {
    title: "Tasks",
    icon: require("@/assets/ui/icon-book-mirrored.png"),
    path: "/tasks",
    name: "tasks",
    component: TasksView,
  },
  {
    title: "Garden",
    icon: require("@/assets/ui/icon-plant.png"),
    path: "/garden",
    name: "garden",
    component: GardenView,
  },
  {
    title: "How To Play",
    icon: require("@/assets/ui/ui-question.svg"),
    path: "/howToPlay",
    name: "HowToPlay",
    component: HowToPlayView,
  },
  {
    title: "Options",
    icon: "",
    path: "/options",
    name: "options",
  },
  {
    title: "Win",
    icon: "",
    path: "/win",
    name: "win",
    component: WinView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
