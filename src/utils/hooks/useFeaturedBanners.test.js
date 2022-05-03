import {render} from '@testing-library/react'
import React from 'react'
import BannerApp from './BannerApi'
import {useFeaturedBanners} from './useFeaturedBanners'

beforeAll(() => render(<useFeaturedBanners />))
describe('Banners Slider test ...is fetching and rendering data from the API', () => {
  it('Banner is fetching data from the API', () => {})
})
