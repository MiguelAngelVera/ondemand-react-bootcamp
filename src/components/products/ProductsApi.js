import React, {useContext, useEffect} from 'react'
import ListContext from '../../states/ListContext'
import useFilter from '../../utils/hooks/useFilter'
import ProductGrid from '../productGrid/ProductGrid'
import * as styles from './Products-style'

export default function ProductsApi() {
  const feature = `&q=${encodeURIComponent(
    '[[at(document.tags, ["Featured"])]]',
  )}`

  const {
    defaultfiltered,
    setParam,
    setProductEncode,
    setProductPageSize,
    setProductLanguage,
    setSearchFor,
    setFilteredProducts,
    setCurrentPage,
  } = useContext(ListContext)

  // Call API and retreive data
  useEffect(() => {
    setParam('')
    setProductEncode('[[at(document.type, "product")]]')
    setProductPageSize(16)
    setProductLanguage('en-us')
    setSearchFor('')
    setFilteredProducts('')
    setCurrentPage(1)
  }, [])

  const {productisLoading} = useFilter(feature)

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
