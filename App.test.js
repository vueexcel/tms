import {render, screen, fireEvent} from '@testing-library/vue'

import Button from "./src/components/common/button.vue";
import '@testing-library/jest-dom'

test('button value on click', async () => {
  const {getByRole} = await render(Button, { 
      propsData: {
        type: 'button'
      }
   });

  const button = getByRole('button')
  await fireEvent.click(button)
})


test('submit value on click', async () => {
  const {getByRole} = await render(Button, { 
      propsData: {
        type: 'submit'
      }
   });

  const button = getByRole('button')
  await fireEvent.click(button)
})