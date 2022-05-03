import React, {useState} from 'react'
import Footer from './components/Footer'
import Header from './components/header/Header.js'
import Space from './components/Space'
import HomePage from './pages/home/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import NotFound from './components/NotFound'
import ProductDetail from './components/productDetail/productDetail'
import ListContext from './states/ListContext'
import ProductPage from './pages/products/Products'
import SearchPage from './pages/search/SearchPage'
import Cart from './pages/cart/Cart'
import CheckOut from './pages/checkout/CheckOut'
import CartContext, {CartContextProvider} from './states/CartContext'

export default function Component() {
  const [searchFor, setSearchFor] = useState('')
  const [filteredProducts, setFilteredProducts] = useState('')
  const [defaultfiltered, setDefaultfiltered] = useState([])
  const [param, setParam] = useState([])
  const [searchString, setSearchString] = useState('')
  const [filterSearchName, setFilterSearchName] = useState([])
  const [filterSearchCat, setFilterSearchCat] = useState([])
  const [filterSearchDesc, setFilterSearchDesc] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  let [productEncode, setProductEncode] = useState([])
  let [productPageSize, setProductPageSize] = useState([])
  let [productLanguage, setProductLanguage] = useState([])
  const [activeItem, setActiveItem] = useState(1)
  const [cartItems, setCartItems] = useState([])
  return (
    <>
      <ListContext.Provider
        value={{
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
        }}
      >
        <Space></Space>
        <Router>
          <Routes>
            <Route
              exact
              path={'/ondemand-react-bootcamp/products/#'}
              element={<ProductPage />}
            ></Route>
            <Route
              exact
              path={'/ondemand-react-bootcamp/products/:id'}
              element={<ProductDetail />}
            ></Route>
            <Route
              path={'/ondemand-react-bootcamp/home'}
              element={<HomePage />}
            ></Route>
            <Route
              path={'/ondemand-react-bootcamp/products'}
              element={<ProductPage />}
            ></Route>
            <Route
              path={'/ondemand-react-bootcamp/search'}
              element={<SearchPage />}
            ></Route>
            <Route
              path={'/ondemand-react-bootcamp/cart'}
              element={<Cart />}
            ></Route>
            <Route
              path={'/ondemand-react-bootcamp/checkout'}
              element={<CheckOut />}
            ></Route>
            <Route
              path={'/ondemand-react-bootcamp/'}
              element={<HomePage />}
            ></Route>
            <Route path={'/*'} element={<NotFound />}></Route>
          </Routes>
          <Header></Header>
        </Router>
        <Footer></Footer>
      </ListContext.Provider>
    </>
  )
}
