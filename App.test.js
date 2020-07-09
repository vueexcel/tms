import {render, screen, fireEvent} from '@testing-library/vue'

import Button from "./src/components/common/button.vue";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

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

test('submit value on click', async () => {
  const mockClick = jest.fn()
  const {getByRole} = await render(Button, { 
      propsData: {
        type: 'submit'
      }
   });

  const button = getByRole('button')
  await userEvent.click(button)
  expect(mockClick.mock.calls.length).toBe(1)
})