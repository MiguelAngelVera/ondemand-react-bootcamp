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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
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
    /* Validating that empty state text appears */
    expect(screen.getByText(/nothing to show on your cart/i))
  })
  it('6.2, 6.3 - List of products is shown and sum of the subtotals', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <CartPage />
          <ProductsApi />
        </MemoryRouter>
      </ListProvider>,
    )

    /* 6.2 - List of products is shown */
    /* Add 3 different items to the cart */
    const cartButtons = await waitFor(() =>
      screen.getAllByRole('button', {name: /addtocartbutton/i}),
    )
    expect(cartButtons.length).toBe(14)
    fireEvent.click(cartButtons[0])
    fireEvent.click(cartButtons[1])
    fireEvent.click(cartButtons[2])

    /* Three images displayed */
    expect(screen.getAllByRole('img', {name: /imgItemCart/i}).length).toBe(3)
    /* Three Product labels displayed */
    expect(screen.getAllByText(/Product:/i).length).toBe(3)
    /* Three Price labels displayed */
    expect(screen.getAllByText(/Price:/i).length).toBe(3)
    /* Three Prices displayed */
    expect(screen.getAllByText(/US\$[0-9]+/i).length).toBe(3)
    /* Three Selectors displayed */
    expect(screen.getAllByRole('combobox', {name: /qtyselector/i}).length).toBe(
      3,
    )
    /* Three Subtotals displayed */
    expect(screen.getAllByText(/subtotal: \$[0-9]+/i).length).toBe(3)
    /* Three Remove buttons displayed */
    expect(
      screen.getAllByRole('button', {name: /removeFromCart/i}).length,
    ).toBe(3)

    /* 6.3 - Total label displays the sum of the subtotals of all items in the cart. */
    /* The price of the three items added to cart */
    const subtotal1 = 40
    const subtotal2 = 147
    const subtotal3 = 41
    /* Validating that the three prices are displayed and are correct */
    expect(screen.getAllByText(new RegExp(`subtotal.*${subtotal1}.00`, 'i')))
    expect(screen.getAllByText(new RegExp(`subtotal.*${subtotal2}.00`, 'i')))
    expect(screen.getAllByText(new RegExp(`subtotal.*${subtotal3}.00`, 'i')))
    /* sum of the subtotals */
    const total = subtotal1 + subtotal2 + subtotal3
    /* Validating that the sum is displayed and correct */
    expect(screen.getAllByText(new RegExp(`total.*${total}.00`, 'i')))
  })

  it('6.4, 6.5 - Update the quantity of items and remove item from the cart ', async () => {
    const {getByTestId, getByText, getByLabelText} = render(
      <ListProvider>
        <MemoryRouter>
          <CartPage />
          <ProductsApi />
        </MemoryRouter>
      </ListProvider>,
    )

    /* 6.4 - Update the quantity of items */
    /* Populate Cart Page with one item form Product Grid */
    const cartButtons = await waitFor(() =>
      screen.getAllByRole('button', {name: /addtocartbutton/i}),
    )
    expect(cartButtons.length).toBe(14)
    fireEvent.click(cartButtons[0])
    /* Once in the cart, change the selector from 1 to 3 units of the same item */
    selectEvent.openMenu(getByLabelText('Qty'))
    const test = getByText('3')
    fireEvent.click(test)
    /* Now the selector displays 3 units */
    expect(getByTestId('form')).toHaveFormValues({qtySelector: '3'})

    /* 6.5 - Remove item from the cart */
    /* Click to remove the item from the cart */
    const deleteItem = screen.getByRole('button', {name: /removeFromCart/i})
    fireEvent.click(deleteItem)
    /* As the only item in the cart was remove, the empty state indicator 
    should be displayed */
    expect(screen.getByText(/nothing to show on your cart/i))
  })
})
