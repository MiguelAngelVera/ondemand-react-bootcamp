import React, {useContext, useEffect, useState} from 'react'
import ListContext from '../../states/ListContext'
import {useFeaturedBanners} from '../../utils/hooks/useFeaturedBanners'
import useFilter from '../../utils/hooks/useFilter'
import ProductGrid from '../productGrid/ProductGrid'
import * as styles from './Products-style'
export default function ProductsApi() {
  const feature = `&q=${encodeURIComponent(
    '[[at(document.tags, ["Featured"])]]',
  )}`

  // const {
  //   //defaultfiltered,
  //   setParam,
  //   // setProductEncode,
  //   // setProductPageSize,
  //   // setProductLanguage,
  //   setSearchFor,
  //   setFilteredProducts,
  //   setCurrentPage,
  // } = useContext(ListContext)

  // Call API and retreive data
  // useEffect(() => {
  //   setParam('')
  //   // setProductEncode('[[at(document.type, "product")]]')
  //   // setProductPageSize(16)
  //   // setProductLanguage('en-us')
  //   setSearchFor('')
  //   setFilteredProducts('')
  //   setCurrentPage(1)
  // }, [])
  // const {defaultfiltered, productisLoading} = useFilter(
  // '[[at(document.type, "product")]]',
  // 'en-us',
  // 16,
  //   feature,
  // )

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
