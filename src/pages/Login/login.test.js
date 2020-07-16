import { render, waitFor, fireEvent } from '@testing-library/vue'

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import Vue from 'vue'
import { setupServer } from "msw/node";
import { store } from '../../store'

import Login from "./Login.vue"



import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)

const configapiresponse = {
  error: false,
  data: {
    login_types: {
      normal_login: true,
      google_login: false,
      google_auth_client_id: "",
    },
  },
};
const loginapiresponse = {
  error: 0,
  data: {
    access_token: "token"
  }
}

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("login form to render", async () => {
  // const customStore = {
  //   actions: {
  //     loginApi: () => jest.fn()
  //   },
  // }

  const { container, getByPlaceholderText, getByText } = await render(Login, { store: { ...store } })

  expect(getByPlaceholderText("Username")).toBeInTheDocument()
  expect(getByPlaceholderText("Password")).toBeInTheDocument()
  expect(getByText("Login")).toBeInTheDocument()

  // let usernameEle = container.querySelector("input[id=username]")
  // let passwordEle = container.querySelector("input[id=password]")

  // userEvent.type(usernameEle, "username")
  // userEvent.type(passwordEle, "123")
  // userEvent.click(getByText("Login"))

  //need some ui updates or api calls or redux state updates to test if form submits
})

test('login success', async () => {
  const customStore = {
    actions: {
      loginApi: () => jest.fn()
    },
  }
  const fakeDetail = {
    username: 'abc',
    password: '13456'
  }
  server.use(
    rest.post(
      "http://tms.api.excellencetechnologies.in/auth/login",
      (req, res, ctx) => {
        console.log("calling");
        if (req.body.action === "get_generic_configuration") {
          return res(ctx.json(configapiresponse));
        } else if (req.body.action === "login") {
          return res(ctx.json(loginapiresponse));
        }
      }
    )
  );
  let { queryByText, getByText, getByTestId, getByRole, getByPlaceholderText } = render(Login, { store: { ...store, ...customStore } });
  const user = getByPlaceholderText('Username')
  const pass = getByPlaceholderText('Password')

  await fireEvent.update(user, fakeDetail.username)
  await fireEvent.update(pass, fakeDetail.password)

  expect(getByText("Login")).toBeInTheDocument(true);
  await waitFor(() => {
    userEvent.click(getByText("Login"));
  });
  expect(getByTestId("loading")).toBeInTheDocument(true); //on button click we should have loading
  
  // await waitFor(() => {
  //   expect(queryByText("Login")).toBeInTheDocument(true);
  // });
  // expect(getByRole("button")).toHaveProperty("disabled", true);
})


test("login failure", async () => {
  const customStore = {
    actions: {
      loginApi: () => jest.fn(),
      getProfile: () => jest.fn()
    },
  }
  const fakeDetail = {
    username: 'abc',
    password: '13456'
  }
  server.use(
    rest.post(
      "http://tms.api.excellencetechnologies.in/auth/login",
      (req, res, ctx) => {
        console.log(req, "failure =======>>>");
        console.log(req.body.action)
        if (JSON.parse(req.body).action === "get_generic_configuration") {
          return res(ctx.json(configapiresponse));
        } else {
          return res(
            ctx.status(500),
            ctx.json({"msg":"invalid login"})
          );
        }
      }
    )
  );
  let { queryByText, getByTestId, getByPlaceholderText } = render(Login, { store: { ...store, ...customStore } });
  const user = getByPlaceholderText('Username')
  const pass = getByPlaceholderText('Password')

  await fireEvent.update(user, fakeDetail.username)
  await fireEvent.update(pass, fakeDetail.password)

  expect(queryByText("Login")).toBeInTheDocument(true);
  userEvent.click(queryByText("Login"));
  await waitFor(() => {
      expect(getByTestId("loading")).toBeInTheDocument(); //on button click we should have loading
  });
  await waitFor(() => {
    // expect(getByTestId("text")).toBeInTheDocument(true);
    expect(getByTestId("error").childElementCount).toBe(1);
  });
});