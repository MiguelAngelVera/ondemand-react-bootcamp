/* eslint-disable no-unused-expressions */
import { useContext, useEffect } from "react";
import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";
import ListContext from "../../states/ListContext";

export default function useList(param) {
  const {
    searchFor,
    filteredProducts,
    setFilteredProducts,
    setDefaultfiltered,
  } = useContext(ListContext);

  let productEncode = '[[at(document.type, "product")]]';
  let productLanguage = "en-us";
  let productPageSize = "100";
  const { data: productDataApi, isLoading: productisLoading } =
    useFeaturedBanners(productEncode, productLanguage, productPageSize);

  useEffect(() => {
    let found = "";
    let temp = "";
    const category = Object.values(searchFor) ?? "";
    const categoryKey = Object.keys(searchFor) ?? "";
    const filtering = () =>
      !productisLoading && category.length
        ? ((found = productDataApi.results.filter((item) =>
            item.data.category.slug.toLowerCase().includes(category)
          )),
          !found.length && category[0] === "remove"
            ? ((temp = filteredProducts),
              delete temp[categoryKey[0]],
              setFilteredProducts(temp))
            : setFilteredProducts({ ...filteredProducts, [category]: found }))
        : null;
    const defaultFiltering = () =>
      !productisLoading
        ? setDefaultfiltered(
            productDataApi.results.filter((it) =>
              it.data.category.slug.toLowerCase().includes("")
            )
          )
        : null;
    const paramFiltering = () =>
      !productisLoading
        ? (console.log(param),
          ((found = productDataApi.results.filter((item) =>
            item.data.category.slug.toLowerCase().includes(param)
          )),
          setFilteredProducts({ ...filteredProducts, [param]: found })))
        : null;
    window.scrollTo(0, 0);
    param !== "" ? paramFiltering() : filtering(), defaultFiltering();
  }, [productisLoading, searchFor]);
  return { productisLoading };
}
