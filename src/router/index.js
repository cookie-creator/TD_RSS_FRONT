import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import Posts from "../views/Posts.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Notifications from "../views/Notifications.vue";

import store from "../store";
import PostsCreate from "../views/PostsCreate.vue";
import PostsView from "../views/PostsView.vue";

const routes = [
  {
    path: '/',
    // name: 'Dashboard',
    redirect: "/app",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/app', name: 'Dashboard', component: Dashboard },
      { path: '/posts', name: 'Posts', component: Posts },
      { path: '/posts/', name: 'PostCreate', component: PostsCreate },
      { path: "/posts/:id", name: "PostView", component: PostsView },
      { path: '/posts/create', name: 'PostsCreate', component: PostsCreate },
      { path: '/notifications', name: 'Notifications', component: Notifications }
    ]
  },
  {
    path: '/',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    meta: {isGuest: true},
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
