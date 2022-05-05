/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import ListContext from '../../states/ListContext'
import AddToCart from '../cart/AddToCart'

const handleChange = (
  e,
  cart,
  itemData,
  cartItems,
  setCartItems,
  setQty,
  setDisableButton,
) => {
  !cart
    ? setQty(parseInt(e.value, 10))
    : setCartItems(
        cartItems.map((existingItem) =>
          existingItem.id === itemData.id
            ? {...existingItem, qty: parseInt(e.value, 10)}
            : existingItem,
        ),
      )
  !cart
    ? cartItems.map((existingItem) =>
        existingItem.id === itemData.id
          ? existingItem.qty + parseInt(e.value, 10) > existingItem.data.stock
            ? setDisableButton(true)
            : setDisableButton(false)
          : null,
      )
    : null
}

export default function Selector({itemData, cart}) {
  const {cartItems, setCartItems} = useContext(ListContext)
  const [qty, setQty] = useState(1)
  const [disableButton, setDisableButton] = useState(false)
  return (
    <>
      <tr>
        <td />
        <td style={{display: 'flex'}}>
          <h5 style={{margin: 0}}>qty: </h5>
          <form data-testid="form">
            <label htmlFor="qtySelector">Qty</label>
            <Select
              aria-label="qtyselector"
              options={[...Array(itemData.data.stock + 1).keys()]
                .slice(1)
                .map((item) => ({label: item, value: item}))}
              name="qtySelector"
              inputId="qtySelector"
              onChange={(e) =>
                handleChange(
                  e,
                  cart,
                  itemData,
                  cartItems,
                  setCartItems,
                  setQty,
                  setDisableButton,
                )
              }
            />
          </form>
          {!cart && <p>stock: {itemData.data.stock}</p>}
        </td>
      </tr>
      <tr>
        <td />
        <td>
          {!disableButton && !cart && (
            <AddToCart itemData={itemData} qty={qty} />
          )}
        </td>
      </tr>
    </>
  )
}

Selector.propTypes = {
  cart: PropTypes.bool.isRequired,
  itemData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
}
