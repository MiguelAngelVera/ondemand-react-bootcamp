/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import {useContext, useEffect} from 'react'
import {useFeaturedBanners} from './useFeaturedBanners'
import ListContext from '../../states/ListContext'

export default function useSearch(test) {
  const {
    productEncode,
    productPageSize,
    productLanguage,
    setFilterSearchName,
    setFilterSearchCat,
    setFilterSearchDesc,
  } = useContext(ListContext)

  const {data: productDataApi, isLoading: productisLoading} =
    useFeaturedBanners(productEncode, productLanguage, productPageSize, '')

  useEffect(() => {
    let found = ''

    const filteringName = () =>
      !productisLoading && productDataApi
        ? ((found = productDataApi.results.filter((item) =>
            item.data.name.toLowerCase().includes(test),
          )),
          found.length ? setFilterSearchName(found) : null)
        : null
    const filteringCategory = () =>
      !productisLoading && productDataApi
        ? ((found = productDataApi.results.filter((item) =>
            item.data.category.slug.toLowerCase().includes(test),
          )),
          found.length ? setFilterSearchCat(found) : null)
        : null
    const filteringDescription = () =>
      !productisLoading && productDataApi
        ? ((found = productDataApi.results.filter((item) =>
            item.data.description[0].text.toLowerCase().includes(test),
          )),
          found.length ? setFilterSearchDesc(found) : null)
        : null
    filteringName()
    filteringCategory()
    filteringDescription()

    window.scrollTo(0, 0)
  }, [test, productisLoading, productDataApi])
  return {productisLoading}
}
