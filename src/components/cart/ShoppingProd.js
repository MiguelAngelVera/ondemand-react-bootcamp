import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ListContext from '../../states/ListContext'
import Selector from '../productDetail/Selector'

const Medium = styled.div``
const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  background-color: white;
`
const Image = styled.img`
  width: 130px;
  @media (max-width: 900px) {
    width: 50%;
    height: 50%;
  }
`
const ProductDetails = styled.div`
  display: flex;
  padding: 0 15px;
  @media (max-width: 900px) {
    display: inline;
    width: 50%;
  }
`
const Text = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 900px) {
    padding: 0;
    font-size: 3vw;
  }
`
const Price = styled.span``
const Name = styled.span``
const Category = styled.span``
const CartActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: auto;
  margin-right: 10px;
`
const Remove = styled.button`
  width: 5vw;
  background-color: #ff573330;
  color: #ff5733;
  border-width: 0;
  @media (max-width: 900px) {
    width: auto;
  }
`

const handleClick = (e, cartItems, setCartItems, data) => {
  setCartItems(cartItems.filter((existingItes) => existingItes.id !== data))
}

export default function ShoppingProd({checkout}) {
  const {cartItems, setCartItems} = useContext(ListContext)

  return (
    <Medium>
      {cartItems.length
        ? cartItems.map((item) => (
            <Row key={item.id}>
              <ProductDetails>
                <Image src={item.data.mainimage.url} />
                <Text>
                  <Name>
                    <b>Product: </b>
                    {item.data.name.toUpperCase()}
                  </Name>
                  {checkout && (
                    <Name>
                      <b>Qty: </b>
                      {item.qty}
                    </Name>
                  )}
                  {!checkout && (
                    <Category>
                      <b>Category: </b>
                      {item.data.category.slug}
                    </Category>
                  )}
                  {!checkout && (
                    <Price>
                      <b>Price: </b>${item.data.price}
                    </Price>
                  )}
                  {!checkout && (
                    <Name>
                      Stock:
                      {item.data.stock}
                    </Name>
                  )}
                </Text>
              </ProductDetails>
              <CartActions>
                {!checkout && (
                  <Remove
                    onClick={(e) =>
                      handleClick(e, cartItems, setCartItems, item.id)
                    }
                  >
                    Remove
                  </Remove>
                )}
                <Text>
                  <table>
                    <tbody>{!checkout && <Selector data={item} cart />}</tbody>
                  </table>
                  <Name>
                    <b>Subtotal: </b>${(item.qty * item.data.price).toFixed(2)}
                  </Name>
                </Text>
              </CartActions>
            </Row>
          ))
        : null}
    </Medium>
  )
}

ShoppingProd.defaultProps = {
  checkout: false,
}

ShoppingProd.propTypes = {
  checkout: PropTypes.bool,
}
