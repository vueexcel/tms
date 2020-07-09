import Vue from "vue";
import { mount } from '@vue/test-utils'
import Button from "./src/components/common/button.vue";

describe("click event", () => {
  
  it('has received button as the type property', () => {
    const wrapper = mount(Button, {
      propsData: {
        type: 'button'
      }
    })
    wrapper.find('button').trigger('click')
    wrapper.find('button').trigger('click', {
      propsData: {
        type: 'submit'
      }
    })
  });
});