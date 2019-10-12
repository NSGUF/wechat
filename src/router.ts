import Vue from 'vue';
import Router from 'vue-router';
import Register from './views/Register.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/SearchFriend.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Chat.vue'),
    },
  ],
});
