import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/about/About.vue'),
    }, {
      path: '/message',
      name: 'message',
      component: () => import('@/views/message/Message.vue'),
    }, {
      path: '/news',
      name: 'news',
      component: () => import('@/views/news/News.vue'),
    }, {
      path: '/charts',
      name: 'charts',
      component: () => import('@/views/charts/Charts.vue'),
    },
  ],
});
