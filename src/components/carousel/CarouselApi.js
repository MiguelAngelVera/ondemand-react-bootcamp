import React from "react";
import { useRef } from "react";
import * as styles from "./Carousel-style";
import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";
import { useNavigate } from "react-router-dom";

export default function CarouselApi() {
  let encode = '[[at(document.type, "category")]]';
  let language = "en-us";
  let pageSize = "30";

  const { data: carouselDataApi, isLoading: carouselIsLoading } =
    useFeaturedBanners(encode, language, pageSize);

  const history = useNavigate();

  const carouselslide = useRef(null);

  const Next = () => {
    if (carouselslide.current.children.length > 0) {
      const firstElement = carouselslide.current.children[0];

      carouselslide.current.style.transition = `350ms ease-in all`;
      carouselslide.current.style.transform = `translateX(-100%)`;
      const append = () => {
        carouselslide.current.style.transition = "none";
        carouselslide.current.style.transform = `translateX(0)`;
        carouselslide.current.appendChild(firstElement);
        carouselslide.current.removeEventListener("transitionend", append);
      };
      carouselslide.current.addEventListener("transitionend", append);
    }
  };

  const Prev = () => {
    if (carouselslide.current.children.length > 0) {
      const index = carouselslide.current.children.length - 1;
      const lastElement = carouselslide.current.children[index];
      carouselslide.current.insertBefore(
        lastElement,
        carouselslide.current.firstChild
      );
      carouselslide.current.style.transition = "none";
      carouselslide.current.style.transform = `translateX(-100%)`;
      setTimeout(() => {
        carouselslide.current.style.transition = "350ms ease-in all";
        carouselslide.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  const handleParams = (e, item) => {
    history(`/products?category=${item.slugs[0].toLowerCase()}`);
  };

  const CarouselBox = (item) => {
    const image = item.data.main_image;
    return (
      <>
        <img src={image.url} alt={image.alt} title={image.alt}></img>
        <styles.CardText>{item.data.name}</styles.CardText>
      </>
    );
  };
  return (
    <>
      <styles.Title>Departments</styles.Title>
      <styles.Container>
        <styles.CardBackground>
          <styles.CardContainer ref={carouselslide}>
            {!carouselIsLoading
              ? carouselDataApi.results.map((item) => (
                  <styles.Card
                    key={item.id}
                    onClick={(e) => handleParams(e, item)}
                  >
                    <CarouselBox {...item} />
                  </styles.Card>
                ))
              : null}
          </styles.CardContainer>
        </styles.CardBackground>
        <styles.Arrow change="prev" onClick={Prev}>
          {"<"}
        </styles.Arrow>
        <styles.Arrow change="next" onClick={Next}>
          {">"}
        </styles.Arrow>
      </styles.Container>
    </>
  );
}
