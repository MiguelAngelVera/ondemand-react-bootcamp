import { createContext } from "react";

const ListContext = createContext({
  searchFor: "",
  setSearchFor: () => {},
  filteredProducts: "",
  setFilteredProducts: () => {},
  defaultfiltered: [],
  setDefaultfiltered: () => {},
  showProducts: "",
  setShowProducts: () => {},
});

export default ListContext;

// const ListContext = createContext({});
// const ContextProvider = ({ children }) => {
//   const [searchFor, setSearchFor] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState("");
//   const [defaultfiltered, setDefaultfiltered] = useState([]);

//   const data = {
//     searchFor,
//     setSearchFor,
//     filteredProducts,
//     setFilteredProducts,
//     defaultfiltered,
//     setDefaultfiltered,
//   };
//   return <ListContext.Provider value={data}>{children}</ListContext.Provider>;
// };

// export { ContextProvider };

// export default ListContext;
