import { useState } from "react";

import ListContext from "../../states/ListContext";
import ProductFilterApi from "./ProductFilterApi";

export default function ProductList() {
  const [searchFor, setSearchFor] = useState("");
  const [filteredProducts, setFilteredProducts] = useState("");
  const [defaultfiltered, setDefaultfiltered] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  return (
    <ListContext.Provider
      value={{
        searchFor,
        setSearchFor,
        filteredProducts,
        setFilteredProducts,
        defaultfiltered,
        setDefaultfiltered,
        showProducts,
        setShowProducts,
      }}
    >
      <ProductFilterApi></ProductFilterApi>
    </ListContext.Provider>
  );
}
