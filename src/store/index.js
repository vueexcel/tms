import Vue from 'vue';
import Vuex from 'vuex';
import pathify from './pathify'
import login from './modules/login'

import layout from './layout';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    pathify.plugin
  ],
  modules: {
    layout,
    login
  }
});