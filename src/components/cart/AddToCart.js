/* eslint-disable no-unused-expressions */
import React, {useContext} from 'react'
import styled from 'styled-components'
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

function handleClick(e, itemData, cartItems, setCartItems, quantity) {
  e.preventDefault()
  console.log(itemData.id)
  const matches = cartItems.filter((existingItemns) =>
    existingItemns.id.includes(itemData.id),
  )
  matches.length
    ? setCartItems(
        cartItems.map((existingItem) => {
          if (existingItem.id === itemData.id) {
            if (existingItem.qty + quantity > existingItem.data.stock) {
              return {...existingItem, qty: existingItem.data.stock}
            }
            return {...existingItem, qty: existingItem.qty + quantity}
          }
          return existingItem
        }),
      )
    : setCartItems([...cartItems, {...itemData, qty: quantity}])

  return null
}
export default function AddToCart({itemData, qty}) {
  const {cartItems, setCartItems} = useContext(ListContext)
  return (
    <ProducttoCart
      onClick={(e) => handleClick(e, itemData, cartItems, setCartItems, qty)}
    >
      Add to Cart
    </ProducttoCart>
  )
}
