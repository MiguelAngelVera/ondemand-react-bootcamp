import React from 'react';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Header from './components/Header';
import Products from './components/Products';
import Space from './components/Space';

export default function Component(){
  return(
    <>
      <Header></Header>
      <Space></Space>
      <Banner></Banner>
      <Space></Space>
      <Carousel></Carousel>
      <Space></Space>
      <Products></Products>
      <Space></Space>
      <Footer></Footer>
    </>
  )
}