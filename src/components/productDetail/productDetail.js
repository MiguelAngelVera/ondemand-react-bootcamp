/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ListContext from "../../states/ListContext";
import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";
import Space from "../Space";

import * as styles from "./productDetail-style";

export default function ProductDetail() {
  const slideref = useRef(null);

  const Slider = () => {
    if (slideref.current.children.length > 1) {
      const firstElement = slideref.current.children[0];
      slideref.current.style.transition = `700ms ease-in all`;
      slideref.current.style.transform = `translateX(-100%)`;
      const append = () => {
        slideref.current.style.transition = "none";
        slideref.current.style.transform = `translateX(0)`;
        slideref.current.appendChild(firstElement);
        slideref.current.removeEventListener("transitionend", append);
      };
      slideref.current.addEventListener("transitionend", append);
    }
  };

  useEffect(() => {
    const autoChange = setInterval(() => {
      Slider();
    }, 2500);
    return () => clearInterval(autoChange);
  }, []);

  const BannerBox = (item) => {
    const image = item.image;
    return <img src={image.url} alt={image.alt} title={image.alt}></img>;
  };

  const InfoBox = (data) => {
    return (
      <>
        <h1 style={{ color: "black", margin: 0 }}>{data.data.name}</h1>
        <styles.Line></styles.Line>
        <styles.MainTable>
          <tbody>
            <tr>
              <td>
                <h5 style={{ color: "#6495ed", marginTop: "5vw" }}>
                  List Price:
                </h5>
              </td>
              <td>
                <h2 style={{ color: "black", marginTop: "5vw" }}>
                  ${data.data.price}
                </h2>
              </td>
            </tr>
            <tr>
              <td></td>
              <td style={{ display: "flex" }}>
                <h5 style={{ margin: 0 }}>qty: </h5>
                <select name="qty" defaultValue="1">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button
                  className="App-button"
                  style={{ margin: 0, padding: 0 }}
                >
                  Add to cart
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <h5 style={{ margin: 1, marginTop: "5vw" }}>sku:</h5>
              </td>
              <td>
                <styles.Line></styles.Line>
                <h5 style={{ margin: 1, marginTop: "5vw" }}>{data.data.sku}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h5 style={{ margin: 1 }}>Category:</h5>
              </td>
              <td>
                <h5 style={{ margin: 1 }}>
                  {data.data.category.slug.replace("--", " & ").toUpperCase()}
                </h5>
              </td>
            </tr>
            <tr>
              <td>
                <h5 style={{ margin: 1 }}>Description:</h5>
              </td>
              <td>
                <p style={{ margin: 1, textAlign: "justify", width: "90%" }}>
                  {data.data.description[0].text}
                </p>
                <styles.Line></styles.Line>
              </td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top" }}>
                <h5 style={{ margin: 1 }}>Things you must know:</h5>
              </td>

              <td style={{ verticalAlign: "top" }}>
                {data.data.specs.map((item) => (
                  <h5 key={item.spec_name} style={{ margin: 10, marginTop: 0 }}>
                    {item.spec_name}: {item.spec_value}
                  </h5>
                ))}
              </td>
            </tr>
          </tbody>
        </styles.MainTable>
      </>
    );
  };

  let { id } = useParams("");

  const {
    productEncode,
    productLanguage,
    productPageSize,
    setProductEncode,
    setProductPageSize,
    setProductLanguage,
  } = useContext(ListContext);

  useEffect(() => {
    setProductEncode(`[[:d=at(document.id , "${id}")]]`);
    setProductPageSize(100);
    setProductLanguage("en-us");
  }, []);

  const { data: productDataApi, isLoading: productisLoading } =
    useFeaturedBanners(productEncode, productLanguage, productPageSize, "");

  return (
    <>
      <Space></Space>
      <styles.Wrapper>
        <styles.Container>
          <styles.SlideContainer ref={slideref}>
            {!productisLoading ? (
              Object.values(
                productDataApi.results[0].data.images.map((item) => (
                  <styles.BannerStyle key={item.image.url}>
                    <BannerBox {...item}></BannerBox>
                  </styles.BannerStyle>
                ))
              )
            ) : (
              <styles.BannerStyle>
                <h2>Loading..</h2>
              </styles.BannerStyle>
            )}
          </styles.SlideContainer>
        </styles.Container>
        <styles.ContainerBackground>
          <styles.Title>
            {!productisLoading ? (
              <InfoBox data={productDataApi.results[0].data}></InfoBox>
            ) : null}
          </styles.Title>
        </styles.ContainerBackground>
      </styles.Wrapper>
    </>
  );
}
