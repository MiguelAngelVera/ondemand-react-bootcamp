/* eslint-disable no-unused-expressions */
import React, {useEffect, useState} from 'react'
import {useFeaturedBanners} from '../../utils/hooks/useFeaturedBanners'
import ProductGrid from '../productGrid/ProductGrid'
import * as styles from './Products-style'

export default function ProductsApi() {
  const feature = `&q=${encodeURIComponent(
    '[[at(document.tags, ["Featured"])]]',
  )}`

  const encode = '[[at(document.type, "product")]]'
  const {data: filtered, isLoading: productisLoading} = useFeaturedBanners(
    encode,
    'en-us',
    16,
    feature,
  )
  const [defaultfiltered, setDefaultfiltered] = useState([])

  useEffect(() => {
    !productisLoading && filtered.results
      ? setDefaultfiltered(
          filtered.results.filter((it) =>
            it.data.category.slug.toLowerCase().includes(''),
          ),
        )
      : null
  }, [filtered, productisLoading])

  return (
    <>
      <styles.Title>
        <div>Top Sellers</div>
      </styles.Title>
      <styles.ContainerBackground>
        <ProductGrid
          feature={feature}
          productisLoading={productisLoading}
          product={defaultfiltered}
        />
      </styles.ContainerBackground>
    </>
  )
}
