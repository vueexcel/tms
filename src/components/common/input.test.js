import { render, screen, fireEvent } from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Input from "./input.vue"

test("input for text", async () => {
    let mockCallback = jest.fn((x) => x)

    const { getByRole, getByPlaceholderText } = await render(Input, {
        propsData: {
          type: 'text',
          id:"123",
          placeholder:"placeholder"
        },
      })

    let input = getByPlaceholderText("placeholder")
    expect(input).toBeInTheDocument()

    expect(input).toHaveAttribute("type", "text")

    await userEvent.type(input, "123")

    // expect(mockCallback).toBeCalledWith("123")

    // expect(mockCallback).toBeCalledTimes(3)


})

test("input type for password", async () => {

    const { container } =  await render(Input, {
        propsData: {
          type: 'password',
          id:"123",
          placeholder:"placeholder"
        }
      })
 
    let element = container.querySelector("input")

    expect(element).toBeInTheDocument()

    expect(element).toHaveAttribute("type", "password")

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

}) 