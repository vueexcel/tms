import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import primaryButton from './button';

export default {
  title: 'Primary Button',
  component: primaryButton,
};

export const Text = () => ({
  components: { primaryButton },
  template: '<primary-button type="button" text="Login" class="bg-secondary text-white w-50 btn-sm"></primary-button>',
  methods: { action: action('clicked') },
});

export const Jsx = () => ({
  components: { primaryButton },
  render(h) {
    return <primary-button callFunction={this.action} text="Login" class="bg-primary text-white w-25 btn-lg"></primary-button>;
  },
  methods: { action: linkTo('clicked') },
});

export const Emoji = () => ({
  components: { primaryButton },
  template: '<primary-button type="button" @click="callFunction" text="😀 😎 👍 💯" class="bg-info text-white w-25 btn-lg"></primary-button>',
  methods: { action: action('clicked') },
});
