import React, { useRef, useEffect } from "react";
import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";
import * as styles from "./Banner-style";

export default function BannerApp() {
  let encode = '[[at(document.type, "banner")]]';
  let language = "en-us";
  let pageSize = "5";

  const { data: bannerDataApi, isLoading: bannerIsLoading } =
    useFeaturedBanners(encode, language, pageSize);

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
    const image = item.data.main_image;
    return <img src={image.url} alt={image.alt} title={image.alt}></img>;
  };

  return (
    <>
      <styles.Title>Popular Products</styles.Title>
      <styles.Container>
        <styles.SlideContainer ref={slideref}>
          {!bannerIsLoading ? (
            bannerDataApi.results.map((item) => (
              <styles.BannerStyle key={item.id}>
                <BannerBox {...item}></BannerBox>
              </styles.BannerStyle>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </styles.SlideContainer>
      </styles.Container>
    </>
  );
}
