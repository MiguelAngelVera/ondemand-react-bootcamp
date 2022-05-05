/* eslint-disable arrow-body-style */

import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import BannerApp from './BannerApi'
import BannetTest from '../../mocks/BannerTest.json'

const server = setupServer(
  rest.get(
    'https://wizeline-academy.cdn.prismic.io/api/v2/documents/search',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(BannetTest))
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
  it('2.1 - Fetch and render Banner', async () => {
    render(<BannerApp />)

    /* Find three images from de mock API */
    const bannerElements = await waitFor(() => screen.getAllByRole('img'))
    expect(bannerElements.length).toBe(3)
  })

  it('2.1.1 - Error calling mock API', async () => {
    /* New request with error */
    server.use(
      rest.get(
        'https://wizeline-academy.cdn.prismic.io/api/v2/documents/search',
        (req, res, ctx) => {
          return res(ctx.status(404))
        },
      ),
    )
    render(<BannerApp />)
    /* Find header that is displayed when theres no API answer */
    const error = await waitFor(() =>
      screen.getByRole('heading', {name: /norender/i}),
    )
    expect(error).toBeInTheDocument()
  })
})
