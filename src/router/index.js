import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView";
import ListView from "../views/ListView";
import ScheduleView from "../views/ScheduleView";
import RecipeDetailsView from "../views/RecipeDetailsView";
import AboutView from "../views/AboutView";
import NotFoundView from "../views/NotFoundView";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/recipes/listing",
    name: "ListView",
    component: ListView,
  },
  {
    path: "/recipes/listing/:name/:id",
    name: "RecipeDetailsView",
    component: RecipeDetailsView,
    props: true,
  },
  {
    path: "/recipes/weekly/schedule",
    name: "ScheduleView",
    component: ScheduleView,
    props: true,
  },
  {
    path: "/vegovoyce/about",
    name: "AboutView",
    component: AboutView,
  },
  {
    path: "/:pathmatch(.*)*",
    name: "NotFoundView",
    component: NotFoundView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
