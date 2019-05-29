import Vue from 'vue';
import App from './App.vue';
import * as ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import filters from '@/fliters/index';
import router from './router/router';
import store from './store/store';

Vue.use(ElementUI);

/**
 * 使用Object.keys防止for in对象tslint必须要if判断是其自身属性
 * for (const key in filters) {
 * if (filters.hasOwnProperty(key)) {
 *  Vue.filter(key, filters[key]);
 * }
 * }
 */
for (const key of Object.keys(filters)) {
  Vue.filter(key, filters[key]);
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
