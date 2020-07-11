import { render } from '@testing-library/vue'

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {store} from './../../store'

import Login from "./Login"

test("login form to render", () => {
    const store = {
        actions: {
            loginApi: () => jest.fn()
        },
    }
    const { container, getByPlaceholderText, getByText } = render(Login, {store})

    expect(getByPlaceholderText("Username")).toBeInTheDocument()
    expect(getByPlaceholderText("Password")).toBeInTheDocument()
    expect(getByText("Login")).toBeInTheDocument()

    let usernameEle = container.querySelector("input[id=username]")
    let passwordEle = container.querySelector("input[id=password]")

    userEvent.type(usernameEle, "username")
    userEvent.type(passwordEle, "123")
    userEvent.click(getByText("Login"))

    //need some ui updates or api calls or redux state updates to test if form submits
})