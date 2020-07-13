import { render, waitFor } from '@testing-library/vue'

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {store} from './../../store'

import Login from "./Login"


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

test('login success',async () => {
    const store = {
        actions: {
            loginApi: () => jest.fn()
        },
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
          let { queryByText } = render(Login, {store});
          await waitFor(() => {
            expect(getByText("Login")).toBeInTheDocument(true);
        });
          userEvent.click(getByText("Login"));
          expect(queryByText("Loading...")).toBeInTheDocument(); //on button click we should have loading
          await waitFor(() => {
            expect(queryByText("Login")).toBeInTheDocument(true);
          });
          expect(getByText("Login")).toHaveProperty("disabled", false);
}) 


test("login failure", async () => {
    server.use(
      rest.post(
        "http://tms.api.excellencetechnologies.in/auth/login",
        (req, res, ctx) => {
          console.log(req, "failure");
         console.log(req.body.action)
          if (JSON.parse(req.body).action === "get_generic_configuration") {
            return res(ctx.json(configapiresponse));
          } else {
            return res(
              ctx.status(200),
              ctx.json({ error: 1, data: { message: "Invalid Login" } })
            );
          }
        }
      )
    );
    let { queryByText, getByTestId } = render(Login,{ store });
    await waitFor(() => {
      expect(queryByText("Login")).toBeInTheDocument(true);
    });
      userEvent.click(queryByText("Login"));
      expect(queryByText("Loading...")).toBeInTheDocument(); //on button click we should have loading
      await waitFor(() => {
        expect(queryByText("Login")).toBeInTheDocument(true);
      });
    expect(getByTestId("error").childElementCount).toBe(1);
  });