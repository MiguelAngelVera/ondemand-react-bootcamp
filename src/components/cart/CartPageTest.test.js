/* eslint-disable arrow-body-style */

import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {MemoryRouter} from 'react-router-dom'
import selectEvent from 'react-select-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {ListProvider} from '../../states/ListContext'
import CartPage from './CartPage'
import PrductsApiTest from '../../mocks/ProductsApiTest.json'
import ProductsApi from '../products/ProductsApi'
import '@testing-library/jest-dom'

Window.getComputedStyle = () => {}
window.scrollTo = jest.fn()

const server = setupServer(
  rest.get(
    'https://wizeline-academy.cdn.prismic.io/api/v2/documents/search',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(PrductsApiTest))
    },
  ),
  rest.get(
    'https://wizeline-academy.cdn.prismic.io/api/v2',
    (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({
          refs: [
            {
              id: 'master',
              ref: 'YZaBvBIAACgAvnOP',
              label: 'Master',
              isMasterRef: true,
            },
          ],
        }),
      )
    },
  ),
)
// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

describe('6 - Test Shopping Cart Page ', () => {
  it('6.1 - Empty State', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </ListProvider>,
    )
    expect(screen.getByText(/nothing to show on your cart/i))
  })
  it('6.2 - List of products is shown ', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <CartPage />
          <ProductsApi />
        </MemoryRouter>
      </ListProvider>,
    )
    const cartButtons = await waitFor(() =>
      screen.getAllByRole('button', {name: /addtocartbutton/i}),
    )
    expect(cartButtons.length).toBe(14)

    fireEvent.click(cartButtons[0])
    fireEvent.click(cartButtons[1])
    fireEvent.click(cartButtons[2])

    expect(screen.getAllByRole('img', {name: /imgItemCart/i}).length).toBe(3)
    expect(screen.getAllByRole('img', {name: /imgItemCart/i}).length).toBe(3)
    expect(screen.getAllByText(/Product:/i).length).toBe(3)
    expect(screen.getAllByText(/Price:/i).length).toBe(3)
    expect(screen.getAllByText(/US\$[0-9]+/i).length).toBe(3)
    expect(screen.getAllByRole('combobox', {name: /qtyselector/i}).length).toBe(
      3,
    )
    expect(screen.getAllByText(/subtotal: \$[0-9]+/i).length).toBe(3)
    expect(
      screen.getAllByRole('button', {name: /removeFromCart/i}).length,
    ).toBe(3)

    const subtotal1 = 40
    const subtotal2 = 147
    const subtotal3 = 41
    expect(screen.getAllByText(new RegExp(`subtotal.*${subtotal1}.00`, 'i')))
    expect(screen.getAllByText(new RegExp(`subtotal.*${subtotal2}.00`, 'i')))
    expect(screen.getAllByText(new RegExp(`subtotal.*${subtotal3}.00`, 'i')))

    const total = subtotal1 + subtotal2 + subtotal3
    expect(screen.getAllByText(new RegExp(`total.*${total}.00`, 'i')))

    // fireEvent.click(qtySelector[0])
    // expect(screen.getAllByRole('cofcfmbobox', {name: /qtyselector/i}))
  })

  it('6.4- List of products is shown ', async () => {
    const {getByTestId, getByText, getByLabelText} = render(
      <ListProvider>
        <MemoryRouter>
          <CartPage />
          <ProductsApi />
        </MemoryRouter>
      </ListProvider>,
    )
    const cartButtons = await waitFor(() =>
      screen.getAllByRole('button', {name: /addtocartbutton/i}),
    )
    expect(cartButtons.length).toBe(14)

    fireEvent.click(cartButtons[0])

    expect(getByTestId('form')).toHaveFormValues({qtySelector: ''})
    selectEvent.openMenu(getByLabelText('Qty'))
    const test = getByText('2')
    fireEvent.click(test)
    expect(getByTestId('form')).toHaveFormValues({qtySelector: '2'})

    const deleteItem = screen.getByRole('button', {name: /removeFromCart/i})
    fireEvent.click(deleteItem)
    expect(screen.getByText(/nothing to show on your cart/i))
  })
})
