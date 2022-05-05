/* eslint-disable react/jsx-no-constructed-context-values */
import React, {useState} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/header/Header'
import Space from './components/Space'
import HomePage from './pages/home/Home'
import './App.css'
import NotFound from './components/NotFound'
import ProductDetail from './components/productDetail/productDetail'
//import ListContext from './states/ListContext'
import ProductPage from './pages/products/Products'
import SearchPage from './pages/search/SearchPage'
import Cart from './pages/cart/Cart'
import CheckOut from './pages/checkout/CheckOut'
import ListContext, {ListProvider} from './states/ListContext'

export default function App() {
  // const [searchFor, setSearchFor] = useState('')
  // const [filteredProducts, setFilteredProducts] = useState('')
  // const [defaultfiltered, setDefaultfiltered] = useState([])
  // const [param, setParam] = useState([])
  // const [searchString, setSearchString] = useState('')
  // const [filterSearchName, setFilterSearchName] = useState([])
  // const [filterSearchCat, setFilterSearchCat] = useState([])
  // const [filterSearchDesc, setFilterSearchDesc] = useState([])
  // const [currentPage, setCurrentPage] = useState(1)
  // const [productEncode, setProductEncode] = useState([])
  // const [productPageSize, setProductPageSize] = useState([])
  // const [productLanguage, setProductLanguage] = useState([])
  // const [activeItem, setActiveItem] = useState(1)
  // const [cartItems, setCartItems] = useState([])
  return (
    // <ListContext.Provider
    //   value={{
    //     searchFor,
    //     setSearchFor,
    //     filteredProducts,
    //     setFilteredProducts,
    //     defaultfiltered,
    //     setDefaultfiltered,
    //     param,
    //     setParam,
    //     productEncode,
    //     setProductEncode,
    //     productPageSize,
    //     setProductPageSize,
    //     productLanguage,
    //     setProductLanguage,
    //     searchString,
    //     setSearchString,
    //     filterSearchName,
    //     setFilterSearchName,
    //     filterSearchCat,
    //     setFilterSearchCat,
    //     filterSearchDesc,
    //     setFilterSearchDesc,
    //     currentPage,
    //     setCurrentPage,
    //     activeItem,
    //     setActiveItem,
    //     cartItems,
    //     setCartItems,
    //   }}
    // >
    <ListProvider>
      <Space />
      <Router>
        <Routes>
          <Route
            exact
            path="/ondemand-react-bootcamp/products/#"
            element={<ProductPage />}
          />
          <Route
            exact
            path="/ondemand-react-bootcamp/products/:id"
            element={<ProductDetail />}
          />
          <Route path="/ondemand-react-bootcamp/home" element={<HomePage />} />
          <Route
            path="/ondemand-react-bootcamp/products"
            element={<ProductPage />}
          />
          <Route
            path="/ondemand-react-bootcamp/search"
            element={<SearchPage />}
          />
          <Route path="/ondemand-react-bootcamp/cart" element={<Cart />} />
          <Route
            path="/ondemand-react-bootcamp/checkout"
            element={<CheckOut />}
          />
          <Route path="/ondemand-react-bootcamp/" element={<HomePage />} />
          <Route path={'/*'} element={<NotFound />} />
        </Routes>
        <Header search="" />
      </Router>
      <Footer />
      {/* </ListContext.Provider> */}
    </ListProvider>
  )
}
