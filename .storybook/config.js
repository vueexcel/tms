import { configure } from '@storybook/vue';

import "bootstrap/dist/css/bootstrap.css";

function loadStories() {

  const req = require.context('../stories', true, /\.stories\.js$/);

  req.keys().forEach(filename => req(filename));

}

configure(loadStories, module);