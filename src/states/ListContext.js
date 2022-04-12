import { createContext } from "react";

const ListContext = createContext({
  searchFor: "",
  setSearchFor: () => {},
  filteredProducts: "",
  setFilteredProducts: () => {},
  defaultfiltered: [],
  setDefaultfiltered: () => {},
  param: "",
  setParam: () => {},
  productEncode: "",
  setProductEncode: () => {},
  productPageSize: "",
  setProductPageSize: () => {},
  productLanguage: "",
  setProductLanguage: () => {},
  searchString: "",
  setSearchString: () => {},
  filterSearchName: "",
  setFilterSearchName: () => {},
  filterSearchCat: "",
  setFilterSearchCat: () => {},
  filterSearchDesc: "",
  setFilterSearchDesc: () => {},
  currentPage: "",
  setCurrentPage: () => {},
  activeItem: "",
  setActiveItem: () => {},
});

export default ListContext;
