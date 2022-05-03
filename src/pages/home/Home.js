import React from 'react'
import BannerApi from '../../components/banner/BannerApi'
import CarouselApi from '../../components/carousel/CarouselApi'
import HomeButton from '../../components/HomeButton'
import ProductsApi from '../../components/products/ProductsApi'
import Space from '../../components/Space'

function HomePage() {
  return (
    <>
      <Space />
      <BannerApi />
      <CarouselApi />
      <ProductsApi />
      <Space />
      <HomeButton />
    </>
  )
}

export default HomePage
