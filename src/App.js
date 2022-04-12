import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/header/Header.js";
import Space from "./components/Space";
import ProductPage from "./pages/products/Products";
import HomePage from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import ProductDetail from "./components/productDetail/productDetail";
import ListContext from "./states/ListContext";
import Search from "./components/search/Search";
import SearchPage from "./pages/search/SearchPage";

export default function Component() {
  const [searchFor, setSearchFor] = useState("");
  const [filteredProducts, setFilteredProducts] = useState("");
  const [defaultfiltered, setDefaultfiltered] = useState([]);
  const [param, setParam] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filterSearchName, setFilterSearchName] = useState([]);
  const [filterSearchCat, setFilterSearchCat] = useState([]);
  const [filterSearchDesc, setFilterSearchDesc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let [productEncode, setProductEncode] = useState([]);
  let [productPageSize, setProductPageSize] = useState([]);
  let [productLanguage, setProductLanguage] = useState([]);
  const [activeItem, setActiveItem] = useState(1);
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
        }}
      >
        <Space></Space>
        <Router>
          <Routes>
            <Route exact path={"/products/#"} element={<ProductPage />}></Route>
            <Route
              exact
              path={"/products/:id"}
              element={<ProductDetail />}
            ></Route>
            <Route path={"/home"} element={<HomePage />}></Route>
            <Route path={"/products"} element={<ProductPage />}></Route>
            <Route path={"/search"} element={<SearchPage />}></Route>
            <Route path={"/*"} element={<NotFound />}></Route>
            <Route path={"/"} element={<HomePage />}></Route>
          </Routes>
          <Header></Header>
        </Router>
        <Footer></Footer>
      </ListContext.Provider>
    </>
  );
}
