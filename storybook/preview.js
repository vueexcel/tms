import { configure } from '@storybook/vue';

import Vue from 'vue';

// Import Vue plugins
import Vuex from 'vuex';

// Import your global components.
import primaryButton from '../src/components/common/button.vue';

// Install Vue plugins.
Vue.use(Vuex);

// Register global components.
Vue.component('primary-button', primaryButton);