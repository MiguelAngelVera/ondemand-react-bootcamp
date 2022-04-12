import { Link, useNavigate } from "react-router-dom";
import * as styles from "./ProductGrid-style";

function Image(item) {
  return (
    <>
      <styles.ProductImage>
        <img src={item.data.mainimage.url} alt={item.id}></img>
        <styles.Line></styles.Line>
        <styles.ProductText>
          <styles.ProductPrice>${item.data.price}</styles.ProductPrice>
          <styles.ProductName>
            {item.data.name.length > 25
              ? item.data.name.substring(0, 24) + "..."
              : item.data.name}
          </styles.ProductName>
          <styles.ProductCategory>
            {item.data.category.slug.toUpperCase().replace("--", " & ")}
          </styles.ProductCategory>
          <styles.ProductDetails>
            <Link
              to={"/ondemand-react-bootcamp/products/" + item.id}
              style={{ textDecoration: "none" }}
            >
              More Details
            </Link>
          </styles.ProductDetails>
          <styles.ProducttoCart>Add to cart</styles.ProducttoCart>
        </styles.ProductText>
      </styles.ProductImage>
    </>
  );
}

export default function ProductGrid({ productisLoading, product, feature }) {
  return (
    <styles.Container>
      {!productisLoading ? (
        product.map((item) => (
          <styles.ProductCard key={item.data.sku + feature}>
            <Image {...item}></Image>
          </styles.ProductCard>
        ))
      ) : (
        <div>Cargando</div>
      )}
    </styles.Container>
  );
}
