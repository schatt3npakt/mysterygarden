import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GardenView from "../views/GardenView.vue";
import AlmanachView from "../views/AlmanachView.vue";
import TasksView from "../views/TasksView.vue";
import WinView from "../views/WinView.vue";
import HowToPlayView from "../views/HowToPlayView.vue";
import OptionsView from "../views/OptionsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    icon: require("@/assets/ui/icon-book.png"),
    path: "/almanach",
    name: "almanach",
    component: AlmanachView,
  },
  {
    icon: require("@/assets/ui/icon-book-mirrored.png"),
    path: "/tasks",
    name: "tasks",
    component: TasksView,
  },
  {
    icon: require("@/assets/ui/icon-plant.png"),
    path: "/garden",
    name: "garden",
    component: GardenView,
  },
  {
    icon: require("@/assets/ui/ui-question.svg"),
    path: "/howToPlay",
    name: "howToPlay",
    component: HowToPlayView,
  },
  {
    icon: require("@/assets/ui/ui-cog.png"),
    path: "/options",
    name: "options",
    component: OptionsView,
  },
  {
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
