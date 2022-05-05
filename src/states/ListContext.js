/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */

import React, {createContext, useMemo, useState} from 'react'

const ListContext = createContext()

function ListProvider({children}) {
  const [searchFor, setSearchFor] = useState('')
  const [filteredProducts, setFilteredProducts] = useState('')
  const [defaultfiltered, setDefaultfiltered] = useState([])
  const [param, setParam] = useState([])
  const [searchString, setSearchString] = useState('')
  const [filterSearchName, setFilterSearchName] = useState([])
  const [filterSearchCat, setFilterSearchCat] = useState([])
  const [filterSearchDesc, setFilterSearchDesc] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productEncode, setProductEncode] = useState([])
  const [productPageSize, setProductPageSize] = useState([])
  const [productLanguage, setProductLanguage] = useState([])
  const [activeItem, setActiveItem] = useState(1)
  const [cartItems, setCartItems] = useState([])

  const value = useMemo(() => {
    return {
      searchFor,
      setSearchFor,
      filteredProducts,
      setFilteredProducts,
      defaultfiltered,
      setDefaultfiltered,
      param,
      setParam,
      productEncode,
      setProductEncode,
      productPageSize,
      setProductPageSize,
      productLanguage,
      setProductLanguage,
      searchString,
      setSearchString,
      filterSearchName,
      setFilterSearchName,
      filterSearchCat,
      setFilterSearchCat,
      filterSearchDesc,
      setFilterSearchDesc,
      currentPage,
      setCurrentPage,
      activeItem,
      setActiveItem,
      cartItems,
      setCartItems,
    }
  }, [
    searchFor,
    setSearchFor,
    filteredProducts,
    setFilteredProducts,
    defaultfiltered,
    setDefaultfiltered,
    param,
    setParam,
    productEncode,
    setProductEncode,
    productPageSize,
    setProductPageSize,
    productLanguage,
    setProductLanguage,
    searchString,
    setSearchString,
    filterSearchName,
    setFilterSearchName,
    filterSearchCat,
    setFilterSearchCat,
    filterSearchDesc,
    setFilterSearchDesc,
    currentPage,
    setCurrentPage,
    activeItem,
    setActiveItem,
    cartItems,
    setCartItems,
  ])
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

export {ListProvider}
export default ListContext
