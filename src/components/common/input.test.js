import { render, screen, fireEvent } from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Input from "./input.vue"

test("input for text", async () => {

    const { getByPlaceholderText } = await render(Input, {
        propsData: {
          type: 'text',
          id:"123",
          placeholder:"Username"
        },
      })

    let input = getByPlaceholderText("Username")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("type", "text")
    expect(input.value).toBe("")
    await fireEvent.update(input, 'Bob')
    expect(input.value).toBe("Bob")
})

test("input type for password", async () => {
    const { container } =  await render(Input, {
        propsData: {
          type: 'password',
          id:"123",
          placeholder:"password"
        }
      })

    let element = container.querySelector("input")
    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute("type", "password")
    expect(element.value).toBe("")
    await fireEvent.update(element, 'Password')
    expect(element.value).toBe("Password")
}) 

test("input type for checkbox", async () => {

    const { container } =  await render(Input, {
        propsData: {
          type: 'checkbox',
          id:"123",
          placeholder:"placeholder"
        }
      })
 
    let element = container.querySelector("input")
    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute("type", "checkbox")
    expect(element.checked).toBe(false)
    await fireEvent.update(element, true)
    expect(element.checked).toBe(true)
}) 

test("input type for number", async () => {

  const { container } =  await render(Input, {
      propsData: {
        type: 'number',
        id:"123",
        placeholder:"placeholder"
      }
    })

  let element = container.querySelector('input')
  expect(element).toBeInTheDocument()
  expect(element).toHaveAttribute("type", "number")
  expect(element.value.number).toBe()
  await fireEvent.update(element,123)
  expect(element.value.number).toBe(123)
}) 