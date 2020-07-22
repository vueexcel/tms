// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery' // eslint-disable-line
// import 'expose-loader?$!jquery' // eslint-disable-line
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue';
import VueBootstrapToasts from 'vue-bootstrap-toasts'
import moment from 'moment';
import 'moment-timezone';
import UUID from 'vue-uuid';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import VueLodash from "vue-lodash";

// Vue.use(VueLodash);
Vue.use(UUID);

import store from './store';
import router from './Routes';
import App from './App';

Object.defineProperty(Vue.prototype, '$moment', { value: moment })

Vue.use(VueAxios, axios)
Vue.use(VueBootstrapToasts)
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});