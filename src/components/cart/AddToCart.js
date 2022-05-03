/* eslint-disable no-unused-expressions */
import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ListContext from '../../states/ListContext'

const ProducttoCart = styled.button``

function handleClick(e, itemData, cartItems, setCartItems, quantity) {
  e.preventDefault()
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

AddToCart.propTypes = {
  qty: PropTypes.number.isRequired,
  itemData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
}
