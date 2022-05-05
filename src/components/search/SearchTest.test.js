/* eslint-disable arrow-body-style */

import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {MemoryRouter} from 'react-router-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Products from '../../mocks/ProductFilterTest/Products.json'
import SearchPage from '../../pages/search/SearchPage'
import {ListProvider} from '../../states/ListContext'
import Header from '../header/Header'

window.scrollTo = jest.fn()

const server = setupServer(
  rest.get(
    'https://wizeline-academy.cdn.prismic.io/api/v2/documents/search',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(Products))
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

describe('5 - Test Search Results Page ', () => {
  it('5.1 - Rendering results from the searchTerm provided', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <Header search="towel" />
          <SearchPage />
        </MemoryRouter>
      </ListProvider>,
    )

    const imgItems = await waitFor(() => screen.getAllByRole('img'))
    expect(imgItems.length).not.toBe(1)
    expect(imgItems.length).not.toBe(0)

    const search = await waitFor(() =>
      screen.getByRole('button', {name: /searchbutton/i}),
    )

    fireEvent.click(search)

    const imgTowels = await waitFor(() => screen.getAllByRole('img'))
    expect(imgTowels.length).toBe(1)

    const towels = await waitFor(() => screen.getAllByAltText(/towel/i))
    expect(towels.length).toBe(1)
  })

  it('5.2 - Empty State', async () => {
    render(
      <ListProvider>
        <MemoryRouter>
          <Header search="FailDummy" />
          <SearchPage />
        </MemoryRouter>
      </ListProvider>,
    )

    expect(screen.queryByText(/nothing to show/i)).toBeNull()

    const search = await waitFor(() =>
      screen.getByRole('button', {name: /searchbutton/i}),
    )

    fireEvent.click(search)

    await waitFor(() => screen.getByText(/nothing to show/i))
  })
})
