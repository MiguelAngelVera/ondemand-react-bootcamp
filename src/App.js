import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/header/Header.js';
import Space from './components/Space';
import ProductPage from './pages/products/Products';
import HomePage from './pages/home/Home';
import './App.css'

export default function Component(){
  const [changeto,setChangeto] = useState(true)

  const handleClick = () => {
    setChangeto(false)
  }

  return(
    <>
      
      <Space></Space>
      <div>
        {changeto && <HomePage/>}
        {changeto && <button onClick={handleClick} className='App-button'>View All Products</button>}
      </div>
      {!changeto && <ProductPage/>}
      <Header change={setChangeto}></Header>
      <Footer></Footer>
    </>
  )
}