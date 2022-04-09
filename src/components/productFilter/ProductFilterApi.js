import React, { useState, useEffect, useContext } from "react";
import * as styles from "./ProductList-style";
import { useSearchParams } from "react-router-dom";
import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";
import ListContext from "../../states/ListContext";
import useList from "./useList";

function Image(element) {
  return (
    <>
      <styles.ProductImage>
        <img src={element.data.mainimage.url} alt={element.data.id}></img>
        <styles.Line></styles.Line>
        <styles.ProductText>
          <styles.ProductPrice>${element.data.price}</styles.ProductPrice>
          <styles.ProductName>{element.data.name}</styles.ProductName>
          <styles.ProductCategory>
            {element.data.category.slug.replace("--", " & ").toUpperCase()}
          </styles.ProductCategory>
        </styles.ProductText>
      </styles.ProductImage>
    </>
  );
}

export default function ProductFilterApi() {
  let categoryEncode = '[[at(document.type, "category")]]';
  let categoryLanguage = "en-us";
  let categoryPageSize = "30";
  const { data: categoryDataApi, isLoading: categoryIsLoading } =
    useFeaturedBanners(categoryEncode, categoryLanguage, categoryPageSize);
  const {
    setSearchFor,
    filteredProducts,
    defaultfiltered,
    showProducts,
    setShowProducts,
  } = useContext(ListContext);
  const [params] = useSearchParams();
  const [param, setParam] = useState(params.get("category") ?? "");
  const [searchParams, setSearchParams] = useSearchParams({});

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(12);
  const indexLastItem = currentPage * postPerPage;
  const indexFirstItem = indexLastItem - postPerPage;

  const [validator, setValidator] = useState("");

  const { productisLoading } = useList(param);

  useEffect(() => {
    let temp = [];
    console.log(filteredProducts);
    const productList = () =>
      !productisLoading && Object.values(filteredProducts).length
        ? (Object.values(filteredProducts).forEach((item) =>
            item.map((item) => (temp = temp.concat(item)))
          ),
          setShowProducts(temp))
        : (defaultfiltered.map((item) => (temp = temp.concat(item))),
          setShowProducts(temp));
    productList();
  }, [filteredProducts, defaultfiltered]);

  useEffect(() => {
    setValidator(showProducts.slice(indexFirstItem, indexLastItem));
  }, [showProducts]);

  const Filtering = (e, categoryClicked) => (
    e.target.style.color === "gray"
      ? setSearchFor({
          [categoryClicked.replace(" & ", "--").toLowerCase()]: categoryClicked
            .replace(" & ", "--")
            .toLowerCase(),
        })
      : setSearchFor({ [categoryClicked.replace(" & ", "--")]: "remove" }),
    e.target.style.color === "gray"
      ? (e.target.style.color = "blue")
      : (e.target.style.color = "gray"),
    param === categoryClicked.replace(" & ", "--").toLowerCase()
      ? setParam("")
      : null,
    searchParams.delete("category"),
    setSearchParams(searchParams)
  );

  return (
    <>
      <styles.Container>
        <styles.NavBarContainer>
          <styles.NavBarCard>
            <div>
              <h1>Products</h1>
            </div>
            <ul>
              <styles.NavBarList>
                {!categoryIsLoading
                  ? categoryDataApi.results.map((item) =>
                      item.data.name.toLowerCase() !==
                      param.replace("--", " & ") ? (
                        <li
                          key={item.id}
                          style={{ color: "gray" }}
                          name={item.id}
                        >
                          <h3
                            onClick={(e) =>
                              Filtering(
                                e,
                                item.data.name.toLowerCase(),
                                item.id
                              )
                            }
                            style={{ color: "gray" }}
                          >
                            {item.data.name}
                          </h3>
                        </li>
                      ) : (
                        <li
                          key={item.id}
                          style={{ color: "blue" }}
                          name={item.id}
                        >
                          <h3
                            onClick={(e) =>
                              Filtering(e, item.data.name.toLowerCase())
                            }
                            style={{ color: "blue" }}
                          >
                            {item.data.name}
                          </h3>
                        </li>
                      )
                    )
                  : null}
              </styles.NavBarList>
            </ul>
          </styles.NavBarCard>
        </styles.NavBarContainer>
        <styles.ProductContainer>
          {!productisLoading ? (
            validator.map((item) => (
              <styles.ProductCard key={item.data.sku}>
                <Image {...item}></Image>
              </styles.ProductCard>
            ))
          ) : (
            <div>Cargando</div>
          )}
        </styles.ProductContainer>
      </styles.Container>
      <styles.Paginate>
        <styles.Arrow change="prev">{"<"}</styles.Arrow>
        <styles.Arrow change="next">{">"}</styles.Arrow>
      </styles.Paginate>
    </>
  );
}
