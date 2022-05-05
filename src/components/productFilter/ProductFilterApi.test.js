/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable arrow-body-style */

import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import ProductFilterApi from './ProductFilterApi'
import {ListProvider} from '../../states/ListContext'
import Categories from '../../mocks/ProductFilterTest/Categories.json'
import Products from '../../mocks/ProductFilterTest/Products.json'

window.scrollTo = jest.fn()

const server = setupServer(
  rest.get(
    'https://wizeline-academy.cdn.prismic.io/api/v2/documents/search',
    (req, res, ctx) => {
      const test = req.url.search
      if (test.includes('product')) {
        return res(ctx.status(200), ctx.json(Products))
      }
      return res(ctx.status(200), ctx.json(Categories))
    },
  ),
  rest.get(
    'https://wizeline-academy.cdn.prismic.io/api/v2',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
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

beforeEach(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('3 - Product List Page', () => {
  it('3.1 -  Category Sidebar fetching and rendering', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <ProductFilterApi />
        </MemoryRouter>
      </ListProvider>,
    )
    /* Find the 5 category buttons of the filter */
    const categories = await waitFor(() =>
      screen.getAllByRole('button', {name: /categoryfilterrendered/i}),
    )
    expect(categories.length).toBe(5)
  })
})
it('3.2 - Category Sidebar', async () => {
  render(
    <ListProvider>
      <MemoryRouter>
        <ProductFilterApi />
      </MemoryRouter>
    </ListProvider>,
  )
  /* Find the product 'Desk Lamp Ezra', which belongs to Lightning category */
  await waitFor(() => screen.getByText(/Ezra/))

  /* Find 'Decorate' filter button */
  const button = await waitFor(() =>
    screen.getByRole('button', {name: /decorate/}),
  )

  /* Click on 'Decorate' button to apply filter */
  fireEvent.click(button)

  /* Validating 'Desk Lamp Ezra' is not displayed anymore */
  expect(screen.queryByText(/Ezra/)).toBeNull()

  /* Validating 'Fair Isle Snowflake Lumbar Cushion Cover' stills
    displayed because belongs to 'Decorate' category */
  await waitFor(() => screen.getByText(/Fair Isle Snowflake/))
})

it('3.3 - Pagination Controls', async () => {
  render(
    <ListProvider>
      <MemoryRouter>
        <ProductFilterApi />
      </MemoryRouter>
    </ListProvider>,
  )
  /* Mock Api contains 30 prodcts
    Considering that 12 items are displayd by page,
    there sould be 3 pages */

  /* Find pagination buttons */
  const buttons = await waitFor(() =>
    screen.getAllByRole('button', {name: /paginationButton/}),
  )

  /* Validating that there are three */
  expect(buttons.length).toBe(3)

  /* Validating that page 1 is activated using the visual indicator */
  expect(screen.queryByText(/page: 1/i)).not.toBeNull()
  expect(screen.queryByText(/page: 2/i)).toBeNull()
  expect(screen.queryByText(/page: 3/i)).toBeNull()

  /* Validating that only 12 items are displayed per page */
  const items = await waitFor(() => screen.getAllByRole('img'))
  expect(items.length).toBe(12)

  /* Click to change to Page 3 */
  const Page3 = await waitFor(() => screen.getByText('3'))
  fireEvent.click(Page3)

  /* Validating that page 2 is activated using the visual indicator */
  expect(screen.queryByText(/page: 1/i)).toBeNull()
  expect(screen.queryByText(/page: 2/i)).toBeNull()
  expect(screen.queryByText(/page: 3/i)).not.toBeNull()

  /* Mock Api contains 30 prodcts
    Considering that 12 items are displayd by page,
    in page three should be only 6 items */

  /* Validating that only 6 items are displayed in page 3 */
  const items3 = await waitFor(() => screen.getAllByRole('img'))
  expect(items3.length).toBe(6)
})
