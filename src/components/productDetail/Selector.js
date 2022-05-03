/* eslint-disable no-unused-expressions */
import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import ListContext from '../../states/ListContext'
import AddToCart from '../cart/AddToCart'

const handleChange = (e, cart, itemData, cartItems, setCartItems, setQty) => {
  !cart
    ? setQty(parseInt(e.target.value, 10))
    : setCartItems(
        cartItems.map((existingItem) =>
          existingItem.id === itemData.id
            ? {...existingItem, qty: parseInt(e.target.value, 10)}
            : existingItem,
        ),
      )
}
export default function Selector({itemData, cart}) {
  const {cartItems, setCartItems} = useContext(ListContext)

  const [qty, setQty] = useState(1)

  return (
    <>
      <tr>
        <td />
        <td style={{display: 'flex'}}>
          <h5 style={{margin: 0}}>qty: </h5>
          <select
            onChange={(e) =>
              handleChange(e, cart, itemData, cartItems, setCartItems, setQty)
            }
            name="qty"
            defaultValue={cart ? itemData.data.qty : qty}
          >
            {[...Array(itemData.data.stock + 1).keys()].slice(1).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {!cart && <p>stock: {itemData.data.stock}</p>}
        </td>
      </tr>
      <tr>
        <td />
        <td>{!cart && <AddToCart itemData={itemData} qty={qty} />}</td>
      </tr>
    </>
  )
}

Selector.propTypes = {
  cart: PropTypes.bool.isRequired,
  itemData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
}
