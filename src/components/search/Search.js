/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { useContext, useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListContext from "../../states/ListContext";
import useSearch from "../../utils/hooks/useSearch";
import Pagination from "../pagination/Pagination";
import ProductGrid from "../productGrid/ProductGrid";
import Space from "../Space";

export default function Search() {
  const [postPerPage, setPostsPerPage] = useState(20);
  const [params] = useSearchParams("");

  const [test, setTest] = useState("");

  const [filteredSearchList, setFilteredSearchList] = useState("");
  const [filteredSearchPagination, setfilteredSearchPagination] = useState("");
  const {
    setProductEncode,
    setProductPageSize,
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
    setActiveItem,
  } = useContext(ListContext);

  useEffect(() => {
    setSearchString(params.get("q") ?? "");
    setTest(searchString);
    setFilterSearchName([]);
    setFilterSearchCat([]);
    setFilterSearchDesc([]);
    setCurrentPage(1);
    setProductEncode(
      `[[at(document.type, "product")]]&q=[[fulltext(document, "${test}")]]`
    );
    setProductPageSize(100);
    setProductLanguage("en-us");
  }, [params, searchString]);

  useEffect(() => {
    let temp = [];
    let skuKey = "";
    let found = "";

    filterSearchName.map((item) => {
      skuKey = item.data.sku;
      found = temp.filter((item) =>
        item.data.sku.toLowerCase().includes(skuKey)
      );

      if (!found.length) {
        temp = temp.concat(item);
      }
    });
    filterSearchDesc.map((item) => {
      skuKey = item.data.sku;
      found = temp.filter((item) =>
        item.data.sku.toLowerCase().includes(skuKey)
      );
      if (!found.length) {
        temp = temp.concat(item);
      }
    });
    filterSearchCat.map((item) => {
      skuKey = item.data.sku;
      found = temp.filter((item) =>
        item.data.sku.toLowerCase().includes(skuKey)
      );

      if (!found.length) {
        temp = temp.concat(item);
      }
    });
    setFilteredSearchList(temp);
    setActiveItem(1);
  }, [filterSearchName, filterSearchCat, filterSearchDesc]);
  //Slices the list previously mentioned to apply pagination
  useEffect(() => {
    let indexLastItem = currentPage * postPerPage;
    let indexFirstItem = indexLastItem - postPerPage;
    setfilteredSearchPagination(
      filteredSearchList.slice(indexFirstItem, indexLastItem)
    );
  }, [filteredSearchList, currentPage]);

  const { productisLoading } = useSearch(test, params);

  return (
    <>
      <Space></Space>
      {!productisLoading ? (
        filteredSearchPagination.length ? (
          <div>
            <ProductGrid
              productisLoading={productisLoading}
              product={filteredSearchPagination}
            ></ProductGrid>
            <Pagination
              postPerPage={postPerPage}
              totalPosts={filteredSearchList.length}
            ></Pagination>
          </div>
        ) : (
          <h2 style={{ textAlign: "center" }}>Nothing to Show ...</h2>
        )
      ) : (
        <h2 style={{ textAlign: "center" }}>Loading ...</h2>
      )}
    </>
  );
}
