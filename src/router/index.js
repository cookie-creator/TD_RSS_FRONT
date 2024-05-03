import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import PostsList from "../views/PostsListPage.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Notifications from "../views/Notifications.vue";

import store from "../store";
import PostsCreate from "../views/PostCreatePage.vue";
import PostsView from "../views/PostViewPage.vue";
import CategoryCreate from "../views/CategoryCreatePage.vue";
import CategoriesList from "../views/CategoriesListPage.vue";
import CategoryView from "../views/CategoryViewPage.vue";

const routes = [
  {
    path: '/',
    // name: 'Dashboard',
    redirect: "/app",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/app', name: 'Dashboard', component: Dashboard },

      { path: '/posts', name: 'PostsList', component: PostsList },
      { path: '/posts/:page', name: 'PostsListPage', component: PostsList },
      { path: "/posts/view/:id", name: "PostView", component: PostsView },
      { path: '/posts/create', name: 'PostsCreate', component: PostsCreate },


      { path: '/categories', name: 'CategoriesList', component: CategoriesList },
      { path: '/category/view', name: 'CategoryView', component: CategoryView },
      { path: '/category/create', name: 'CategoryCreate', component: CategoryCreate },

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
