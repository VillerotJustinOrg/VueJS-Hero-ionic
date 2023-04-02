import Vue from "vue";
import VueRouter from "vue-router";
import OrganisationsView from "../views/List/OrganisationsView.vue";
import TeamsView from "../views/List/TeamsView.vue";
import AuthView from "../views/AuthView.vue";
import TeamDetailView from "../views/Detail/TeamDetailView.vue";
import OrgDetailView from "../views/Detail/OrgDetailView.vue";
import store from "../store";
import HomeView from "../views/HomeView.vue";
import HeroDetailView from "../views/Detail/HeroDetailView.vue";
import ProfileView from "../views/ProfileView.vue";

Vue.use(VueRouter);

/*
    le(s) composant(s) chargé(s) d'une organisation particulière,
    le(s) composant(s) chargé(s) d'une équipe particulière,
 */

const routes = [
  // le composant chargé de l'authentification,
  {
    path: "/auth",
    name: "auth",
    component: AuthView,
  },
  // le composant chargé de la liste des organisations,
  {
    path: "/organisations",
    name: "organisations",
    component: OrganisationsView,
  },
  {
    path: "/organisations/:id",
    name: "orgDetailView",
    component: OrgDetailView,
    meta: { auth: true },
  },
  // composant chargé de la liste des teams,
  {
    path: "/teams",
    name: "teams",
    component: TeamsView,
  },
  {
    path: "/teams/:id",
    name: "teamDetail",
    component: TeamDetailView,
    meta: { auth: true },
  },
  {
    path: "/heroes/:id",
    name: "heroDetail",
    component: HeroDetailView,
    meta: { auth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: { authUser: true },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "*",
    name: "error404",
    access: 0,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "error404") {
    store.commit("errors/pushError", "Invalid route", { root: true });
    next("/");
  } else if (to.meta.auth) {
    if (store.state.auth.isAuth) {
      next();
    } else {
      console.log("You need to login");
      store.commit("errors/pushError", "You need to login", { root: true });
      next("/auth");
    }
  } else if (to.meta.authUser) {
    if (store.state.auth.isUserAuth) {
      next();
    } else {
      console.log("You need to login as an User");
      store.commit("errors/pushError", "You need to login as an User", {
        root: true,
      });
      next("/auth");
    }
  } else next();
});

export default router;
