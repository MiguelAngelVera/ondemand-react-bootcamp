/* eslint-disable arrow-body-style */

import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import ProductsApi from './ProductsApi'
import {ListProvider} from '../../states/ListContext'
import PrductsApiTest from '../../mocks/ProductsApiTest.json'

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

describe('2 - Home Page:', () => {
  it('2.3 - Fetch and render Products Grid', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <ProductsApi />
        </MemoryRouter>
      </ListProvider>,
    )
    /* Find 14 (mandatory) images displayed */
    const bannerElements = await waitFor(() => screen.getAllByRole('img'))
    expect(bannerElements.length).toBe(14)
  })
})
