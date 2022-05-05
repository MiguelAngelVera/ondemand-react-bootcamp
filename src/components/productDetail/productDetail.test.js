/* eslint-disable arrow-body-style */

import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import ProductDetail from './productDetail'
import {ListProvider} from '../../states/ListContext'
import ProductDetailTest from '../../mocks/ProductDetailTest/ProductDetailTest.json'
import Categories from '../../mocks/ProductFilterTest/Categories.json'
import HeaderCart from '../header/HeaderCart'

window.scrollTo = jest.fn()

const server = setupServer(
  rest.get(
    'https://wizeline-academy.cdn.prismic.io/api/v2/documents/search',
    (req, res, ctx) => {
      const test = req.url.search
      if (test.includes('.id')) {
        return res(ctx.status(200), ctx.json(ProductDetailTest))
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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('4 - Product Detail Page: Test', () => {
  it('4.1 - Fetch and render', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <ProductDetail />
        </MemoryRouter>
      </ListProvider>,
    )
    const GoDetailPage = await waitFor(() => screen.getAllByRole('img'))
    expect(GoDetailPage.length).toBe(3)
  })

  it('4.2 - Content of the Page', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <ProductDetail />
        </MemoryRouter>
      </ListProvider>,
    )
    await waitFor(() => screen.getByRole('heading', {name: /priceLabel/i}))
    await waitFor(() => screen.getByRole('heading', {name: /priceValue/i}))
    await waitFor(() => screen.getByText(/\$[1-9]+/i))
    await waitFor(() => screen.getByRole('heading', {name: /skuLabel/i}))
    await waitFor(() => screen.getByRole('heading', {name: /skuValue/i}))
    await waitFor(() => screen.getByRole('heading', {name: /categoryLabel/i}))
    await waitFor(() => screen.getByRole('heading', {name: /categoryValue/i}))
    await waitFor(() => screen.getByText(/decorate/i))
    await waitFor(() =>
      screen.getByRole('heading', {name: /descriptionLabel/i}),
    )
    await waitFor(() => screen.getByRole('heading', {name: /specsLabel/i}))
    const specs = await waitFor(() =>
      screen.getAllByRole('heading', {name: /specsValue/i}),
    )
    expect(specs.length).not.toBe(0)
    expect(specs.length).not.toBe(1)
  })

  it('4.3 - Selector and Add to cart', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <ProductDetail />
        </MemoryRouter>
      </ListProvider>,
    )
    await waitFor(() => screen.getByRole('combobox'))
    await waitFor(() => screen.getByRole('button'))
  })

  it('4.4 - Add to cart works', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <HeaderCart />
          <ProductDetail />
        </MemoryRouter>
      </ListProvider>,
    )
    const ProductsOnCarBefore = await waitFor(() =>
      screen.queryByRole('heading', {name: /numberOfProducts/i}),
    )
    expect(ProductsOnCarBefore).toBeNull()

    const button = await waitFor(() => screen.getByRole('button'))
    fireEvent.click(button)

    const ProductsOnCarAfter = await waitFor(() =>
      screen.queryByRole('heading', {name: /numberOfProducts/i}),
    )
    expect(ProductsOnCarAfter).not.toBeNull()
  })
})

it('4.5 - Add to cart disable', async () => {
  render(
    <ListProvider>
      <MemoryRouter>
        <HeaderCart />
        <ProductDetail />
      </MemoryRouter>
    </ListProvider>,
  )

  const button = await waitFor(() => screen.getByRole('button'))
  for (let i = 0; i < 50; i += 1) {
    fireEvent.click(button)
  }
  const validator = await waitFor(() => screen.getAllByText('48'))
  expect(validator.length).toBe(1)
})
