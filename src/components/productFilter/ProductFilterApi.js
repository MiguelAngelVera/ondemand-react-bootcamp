/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react'
import * as styles from './ProductList-style'
import {useSearchParams} from 'react-router-dom'
import {useFeaturedBanners} from '../../utils/hooks/useFeaturedBanners'
import ListContext from '../../states/ListContext'
import useFilter from '../../utils/hooks/useFilter'
import ProductGrid from '../productGrid/ProductGrid'
import Pagination from '../pagination/Pagination'

const myStyleGray = {
  color: 'gray',
}

const myStyleBlue = {
  color: 'blue',
}

export default function ProductFilterApi() {
  let categoryEncode = '[[at(document.type, "category")]]'
  let categoryLanguage = 'en-us'
  let categoryPageSize = '30'
  let {data: categoryDataApi, isLoading: categoryIsLoading} =
    useFeaturedBanners(categoryEncode, categoryLanguage, categoryPageSize)
  const {
    setSearchFor,
    filteredProducts,
    defaultfiltered,
    setFilteredProducts,
    param,
    setParam,
    setProductEncode,
    setProductPageSize,
    setProductLanguage,
    currentPage,
    setCurrentPage,
    setActiveItem,
  } = useContext(ListContext)
  const [params] = useSearchParams()
  const [searchParams, setSearchParams] = useSearchParams({})
  const [postPerPage, setPostsPerPage] = useState(12)

  const [productList, setProductList] = useState('')
  const [productPagination, setProductPagination] = useState('')
  const [clearButton, setClearButton] = useState(false)
  const [focus, setFocus] = useState(false)
  let feature = ''

  //Call API and retreive data
  useEffect(() => {
    setParam(params.get('category') ?? '')
    setProductEncode('[[at(document.type, "product")]]')
    setProductPageSize(100)
    setProductLanguage('en-us')
  }, [])

  //Filters following the categories selected
  const {productisLoading} = useFilter(feature)

  useEffect(() => {
    focus ? setFocus(false) : null
  }, [focus])

  //Creates the list of all the products that will be shown
  useEffect(() => {
    let temp = []
    const productList = () =>
      !productisLoading && Object.values(filteredProducts).length
        ? (Object.values(filteredProducts).forEach((item) =>
            item.map((item) => (temp = temp.concat(item))),
          ),
          setProductList(temp),
          setClearButton(true))
        : (defaultfiltered.map((item) => (temp = temp.concat(item))),
          setProductList(temp),
          setClearButton(false))
    productList()
    setCurrentPage(1)
    setActiveItem(1)
  }, [filteredProducts, defaultfiltered])

  //Slices the list previously mentioned to apply pagination
  useEffect(() => {
    let indexLastItem = currentPage * postPerPage
    let indexFirstItem = indexLastItem - postPerPage
    setProductPagination(productList.slice(indexFirstItem, indexLastItem))
    window.scrollTo(0, 0)
  }, [productList, currentPage, productList])

  const handleFiltering = (e, categoryClicked) => (
    e.target.style.color === 'gray'
      ? setSearchFor({
          [categoryClicked.replace(' & ', '--').toLowerCase()]: categoryClicked
            .replace(' & ', '--')
            .toLowerCase(),
        })
      : setSearchFor({[categoryClicked.replace(' & ', '--')]: 'remove'}),
    e.target.style.color === 'gray'
      ? (e.target.style.color = 'blue')
      : (e.target.style.color = 'gray'),
    param === categoryClicked.replace(' & ', '--').toLowerCase()
      ? setParam('')
      : null,
    searchParams.delete('category'),
    setSearchParams(searchParams)
  )

  const handleReset = () => (
    setSearchFor(''),
    setFilteredProducts(''),
    setClearButton(false),
    setParam(''),
    searchParams.delete('category'),
    setSearchParams(searchParams),
    setFocus(true)
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <>
      <styles.Container>
        <styles.NavBarContainer>
          <styles.NavBarCard>
            <styles.Title>
              <h1>Products</h1>
            </styles.Title>
            <ul>
              <styles.NavBarList>
                {!focus ? (
                  !categoryIsLoading ? (
                    categoryDataApi.results.map((item) =>
                      item.data.name.toLowerCase() !==
                      param.replace('--', ' & ') ? (
                        <li key={item.id} style={myStyleGray} name={item.id}>
                          <h3
                            onClick={(e) =>
                              handleFiltering(e, item.data.name.toLowerCase())
                            }
                            style={myStyleGray}
                          >
                            {item.data.name}
                          </h3>
                        </li>
                      ) : (
                        <li key={item.id} style={myStyleBlue} name={item.id}>
                          <h3
                            onClick={(e) =>
                              handleFiltering(e, item.data.name.toLowerCase())
                            }
                            style={myStyleBlue}
                          >
                            {item.data.name}
                          </h3>
                        </li>
                      ),
                    )
                  ) : (
                    <li style={{textAlign: 'center'}}>Loading...</li>
                  )
                ) : !categoryIsLoading ? (
                  categoryDataApi.results.map((item) => (
                    <li key={item.data.name} style={myStyleGray} name={item.id}>
                      <h3
                        onClick={(e) =>
                          handleFiltering(e, item.data.name.toLowerCase())
                        }
                        style={myStyleGray}
                      >
                        {item.data.name}
                      </h3>
                    </li>
                  ))
                ) : (
                  <li style={{textAlign: 'center'}}>Loading...</li>
                )}
              </styles.NavBarList>
              {clearButton && (
                <button
                  style={{
                    margin: '3vw auto',
                    display: 'block',
                    color: '#6495ed',
                    borderWidth: 0,
                    paddin: '1vw 0',
                  }}
                  onClick={handleReset}
                >
                  Clear Filter
                </button>
              )}
            </ul>
          </styles.NavBarCard>
        </styles.NavBarContainer>
        <styles.ProductContainer style={{width: 'auto'}}>
          <ProductGrid
            feature={feature}
            productisLoading={productisLoading}
            product={productPagination}
          ></ProductGrid>
          <Pagination
            postPerPage={postPerPage}
            totalPosts={productList.length}
          ></Pagination>
        </styles.ProductContainer>
      </styles.Container>
    </>
  )
}
