import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";
import * as styles from "./Products-style";

function Image(item) {
  return (
    <>
      <styles.ProductImage>
        <img src={item.data.mainimage.url} alt={item.data.id}></img>
        <styles.Line></styles.Line>
        <styles.ProductText>
          <styles.ProductPrice>${item.data.price}</styles.ProductPrice>
          <styles.ProductName>{item.data.name}</styles.ProductName>
          <styles.ProductCategory>
            {item.data.category.slug.toUpperCase().replace("--", " & ")}
          </styles.ProductCategory>
          <styles.ProductDetails>More Details</styles.ProductDetails>
          <styles.ProducttoCart>Add to cart</styles.ProducttoCart>
        </styles.ProductText>
      </styles.ProductImage>
    </>
  );
}

export default function ProductsApi() {
  let encode = '[[at(document.type, "product")]]';
  let language = "en-us";
  let pageSize = "16";
  let feature = `&q=${encodeURIComponent(
    '[[at(document.tags, ["Featured"])]]'
  )}`;
  const { data: productDataApi, isLoading: productIsLoading } =
    useFeaturedBanners(encode, language, pageSize, feature);
  return (
    <>
      <styles.Title>
        <div>Top Sellers</div>
      </styles.Title>
      <styles.ContainerBackground>
        <styles.Container>
          {!productIsLoading
            ? productDataApi.results.map((item) => (
                <styles.ProductContainer key={item.data.sku}>
                  <Image {...item}></Image>
                </styles.ProductContainer>
              ))
            : null}
        </styles.Container>
      </styles.ContainerBackground>
    </>
  );
}
