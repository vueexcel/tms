import Vue from 'vue';
import primaryButton from './button.vue';

export default { title: 'Button' };

export const withText = () => '<primary-button>with text</primary-button>';

export const withEmoji = () => '<primary-button>😀 😎 👍 💯</primary-button>';

export const asAComponent = () => ({
  components: { primaryButton },
  template: '<primary-button :rounded="true">rounded</primary-button>'
});
