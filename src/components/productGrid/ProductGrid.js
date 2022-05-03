import {Link, useNavigate} from 'react-router-dom'
import AddToCart from '../cart/AddToCart'
import * as styles from './ProductGrid-style'

function Image(item) {
  return (
    <styles.ProductImage>
        <img src={item.data.mainimage.url} alt={item.id} />
        <styles.Line />
        <styles.ProductText>
          <styles.ProductPrice>${item.data.price}</styles.ProductPrice>
          <styles.ProductName>
            {item.data.name.length > 25
              ? `${item.data.name.substring(0, 24)  }...`
              : item.data.name}
          </styles.ProductName>
          <styles.ProductCategory>
            {item.data.category.slug.toUpperCase().replace('--', ' & ')}
          </styles.ProductCategory>
          <styles.ProductDetails>
            <Link
              to={`/ondemand-react-bootcamp/products/${  item.id}`}
              style={{textDecoration: 'none'}}
            >
              More Details
            </Link>
          </styles.ProductDetails>
          <AddToCart data={item} qty={1} />
        </styles.ProductText>
      </styles.ProductImage>
  )
}

export default function ProductGrid({productisLoading, product, feature}) {
  return (
    <>
      {productisLoading ? (
        <h2 style={{textAlign: 'center'}}>Loading...</h2>
      ) : null}
      <styles.Container>
        {!productisLoading
          ? product.map((item) => (
              <styles.ProductCard key={item.data.sku + feature}>
                <Image {...item} />
              </styles.ProductCard>
            ))
          : null}
      </styles.Container>
    </>
  )
}
