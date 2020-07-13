import { render, screen, fireEvent } from '@testing-library/vue'

import Button from "./button.vue";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Login from "../../pages/Login/Login.vue"

test('button value on click', async () => {
  await render(Login)
  const { getByRole } = await render(Button, {
    propsData: {
      type: 'button',
      clickCall: () => { }
    }
  });

  const button = getByRole('button')
  await fireEvent.click(button)
})


test('submit value on click', async () => {
  const { getByRole } = await render(Button, {
    propsData: {
      type: 'submit',
      clickCall: () => { }
    }
  });

  const button = getByRole('button')
  await fireEvent.click(button)
})

test('submit value on click of button', async () => {
  const { emitted, getByRole } = await render(Button, {
    propsData: {
      type: 'button'
    }
  });

  const button = getByRole('button')
  await userEvent.click(button)

  expect(emitted().clickCall.length).toBe(1)

})

test('submit value on click of submit', async () => {
  const { emitted, getByRole } = await render(Button, {
    propsData: {
      type: 'submit'
    }
  });

  const button = getByRole('button')
  await userEvent.click(button)

  expect(emitted().clickCall.length).toBe(1)

})