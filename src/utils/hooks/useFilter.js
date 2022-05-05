/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import {useContext, useEffect} from 'react'
import {useFeaturedBanners} from './useFeaturedBanners'
import ListContext from '../../states/ListContext'

export default function useFilter(
  productEncode,
  productLanguage,
  productPageSize,
) {
  const {
    searchFor,
    filteredProducts,
    setFilteredProducts,
    setDefaultfiltered,
    defaultfiltered,
    param,
    // productEncode,
    // productPageSize,
    // productLanguage,
  } = useContext(ListContext)

  const {data: productDataApi, isLoading: productisLoading} =
    useFeaturedBanners(productEncode, productLanguage, productPageSize)
  useEffect(() => {
    let found = ''
    let temp = ''
    const category = Object.values(searchFor) ?? ''
    const categoryKey = Object.keys(searchFor) ?? ''
    const filtering = () =>
      !productisLoading && category.length
        ? ((found = productDataApi.results.filter((item) =>
            item.data.category.slug.toLowerCase().includes(category),
          )),
          !found.length && category[0] === 'remove'
            ? ((temp = filteredProducts),
              delete temp[categoryKey[0]],
              setFilteredProducts(temp))
            : setFilteredProducts({...filteredProducts, [category]: found}))
        : null
    const defaultFiltering = () =>
      !productisLoading && productDataApi.results
        ? setDefaultfiltered(
            productDataApi.results.filter((it) =>
              it.data.category.slug.toLowerCase().includes(''),
            ),
          )
        : null
    const paramFiltering = () =>
      !productisLoading
        ? ((found = productDataApi.results.filter((item) =>
            item.data.category.slug.toLowerCase().includes(param),
          )),
          setFilteredProducts({[param]: found}))
        : null
    param !== '' && !category.length
      ? paramFiltering()
      : (filtering(), defaultFiltering())
  }, [productisLoading, searchFor])
  return {defaultfiltered, productisLoading, filteredProducts}
}
