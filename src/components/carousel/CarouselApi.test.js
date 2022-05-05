/* eslint-disable arrow-body-style */

import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import CarouselApi from './CarouselApi'
import CarousselTest from '../../mocks/CarousselTest.json'

const server = setupServer(
  rest.get(
    'https://wizeline-academy.cdn.prismic.io/api/v2/documents/search',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(CarousselTest))
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

it('fetch and render', async () => {
  render(
    <MemoryRouter>
      <CarouselApi />
    </MemoryRouter>,
  )
  const bannerElements = await waitFor(() => screen.getAllByRole('img'))
  expect(bannerElements.length).toBe(5)
})

it('failed fetch and render', async () => {
  server.use(
    rest.get(
      'https://wizeline-academy.cdn.prismic.io/api/v2/documents/search',
      (req, res, ctx) => {
        return res(ctx.status(404))
      },
    ),
  )
  render(
    <MemoryRouter>
      <CarouselApi />
    </MemoryRouter>,
  )
  const error = await waitFor(() =>
    screen.getByRole('heading', {name: /norender/i}),
  )
  expect(error).toBeInTheDocument()
})
