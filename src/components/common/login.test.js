import { render, screen, fireEvent } from '@testing-library/vue'

import Login from "./Login.vue";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

// import Login from "../../pages/Login/Login.vue"

test('button value on click', async () => {
  const { getByRole } = await render(Login);
})