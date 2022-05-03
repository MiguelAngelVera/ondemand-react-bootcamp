/* eslint-disable no-unused-expressions */
import React, {useContext} from 'react'
import styled from 'styled-components'
import CartContext from '../../states/CartContext'
import ListContext from '../../states/ListContext'

const ProducttoCart = styled.button`
  /* position: absolute;
  border-width: 0px;
  color: #6495ed;
  font-size: 1.2vw;
  display: flex;
  border-radius: 0.3rem;
  bottom: 0;
  margin: 0 auto;
  align-content: center;
  @media (max-width: 900px) {
    font-size: 3vw;
  } */
`

function handleClick(e, data, cartItems, setCartItems, quantity) {
  e.preventDefault()
  let item = data.data
  let matches = cartItems.filter((existingItemns) =>
    existingItemns.id.includes(item.id),
  )

  matches.length
    ? setCartItems(
        cartItems.map((existingItem) =>
          existingItem.id === item.id
            ? existingItem.qty + quantity > existingItem.data.stock
              ? {...existingItem, qty: existingItem.data.stock}
              : {...existingItem, qty: existingItem.qty + quantity}
            : existingItem,
        ),
      )
    : setCartItems([...cartItems, {...item, qty: quantity}])
}
export default function AddToCart(data, {qty}) {
  const {cartItems, setCartItems} = useContext(ListContext)
  return (
    <ProducttoCart
      onClick={(e) => handleClick(e, data, cartItems, setCartItems, data.qty)}
    >
      Add to Cart
    </ProducttoCart>
  )
}
