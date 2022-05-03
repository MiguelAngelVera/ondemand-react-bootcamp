import React, {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import AddToCart from '../cart/AddToCart'
import * as styles from './ProductGrid-style'

function Image({
  itemData,
  itemImage,
  itemName,
  itemPrice,
  itemCategory,
  itemId,
}) {
  return (
    <styles.ProductImage>
      <img src={itemImage} alt={itemName} />
      <styles.Line />
      <styles.ProductText>
        <styles.ProductPrice>${itemPrice}</styles.ProductPrice>
        <styles.ProductName>
          {itemName.length > 25 ? `${itemName.substring(0, 24)}...` : itemName}
        </styles.ProductName>
        <styles.ProductCategory>
          {itemCategory.toUpperCase().replace('--', ' & ')}
        </styles.ProductCategory>
        <styles.ProductDetails>
          <Link
            to={`/ondemand-react-bootcamp/products/${itemId}`}
            style={{textDecoration: 'none'}}
          >
            More Details
          </Link>
        </styles.ProductDetails>
        <AddToCart itemData={itemData} qty={1} />
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
          ? product.map((itemData) => (
              <styles.ProductCard key={itemData.data.sku + feature}>
                <Image
                  itemData={itemData}
                  itemImage={itemData.data.mainimage.url}
                  itemName={itemData.data.name}
                  itemPrice={itemData.data.price}
                  itemCategory={itemData.data.category.slug}
                  itemId={itemData.id}
                />
              </styles.ProductCard>
            ))
          : null}
      </styles.Container>
    </>
  )
}

Image.propTypes = {
  itemImage: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
  itemCategory: PropTypes.string.isRequired,
  itemData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
}

ProductGrid.propTypes = {
  productisLoading: PropTypes.bool.isRequired,
  product: PropTypes.oneOfType([PropTypes.array]).isRequired,
  feature: PropTypes.string.isRequired,
}
