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

    /* The SearchPage is configured to show all the items when
    there is no searchTerm provided ir it is empty (""). Because of this,
    it should display the 20 elements (mandatory) per page */
    const imgItems = await waitFor(() => screen.getAllByRole('img'))
    expect(imgItems.length).toBe(20)

    /* Click the button to apply the search of the searchTerm. In this case
    the searchTerm is "towel" (indicated as parameter in the render event) */
    const search = await waitFor(() =>
      screen.getByRole('button', {name: /searchbutton/i}),
    )
    fireEvent.click(search)

    /* In the mock API there is only one match, and thus showing 
    only one element is displayed */
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
    /* Validating that empty state text is not displayed */
    expect(screen.queryByText(/nothing to show/i)).toBeNull()

    /* Apply search of random string (indicated as parameter in the render event) */
    const search = await waitFor(() =>
      screen.getByRole('button', {name: /searchbutton/i}),
    )
    fireEvent.click(search)

    /* Validating that empty state appiers */
    await waitFor(() => screen.getByText(/nothing to show/i))
  })
})
