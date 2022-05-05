/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/header/Header'
import Space from './components/Space'
import HomePage from './pages/home/Home'
import './App.css'
import NotFound from './components/NotFound'
import ProductDetail from './components/productDetail/productDetail'
import ProductPage from './pages/products/Products'
import SearchPage from './pages/search/SearchPage'
import Cart from './pages/cart/Cart'
import CheckOut from './pages/checkout/CheckOut'
import {ListProvider} from './states/ListContext'

export default function App() {
  return (
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
    </ListProvider>
  )
}
