import React from "react";
import Footer from "./components/Footer";
import Header from "./components/header/Header.js";
import Space from "./components/Space";
import ProductPage from "./pages/products/Products";
import HomePage from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
//import List from "./components/productFilter/List";

export default function Component() {
  return (
    <>
      <Space></Space>
      <Router>
        <Routes>
          <Route path={"/*"} element={<NotFound />}></Route>
          <Route path={"/home"} element={<HomePage />}></Route>
          <Route path={"/"} element={<HomePage />}></Route>
          <Route path={"/products"} element={<ProductPage />}></Route>
        </Routes>
        <Header></Header>
      </Router>

      <Footer></Footer>
    </>
  );
}
