import React, {useContext, useState} from 'react'
import CartContext from '../../states/CartContext'
import ListContext from '../../states/ListContext'
import AddToCart from '../cart/AddToCart'

export default function Selector(data, {cart}) {
  const {cartItems, setCartItems} = useContext(ListContext)

  const [qty, setQty] = useState(1)
  const handleChange = (e, cart, data) => {
    !cart
      ? setQty(parseInt(e.target.value, 10))
      : setCartItems(
          cartItems.map((existingItem) =>
            existingItem.id === data.data.id
              ? {...existingItem, qty: parseInt(e.target.value, 10)}
              : existingItem,
          ),
        )
  }
  return (
    <>
      <tr>
        <td />
        <td style={{display: 'flex'}}>
          <h5 style={{margin: 0}}>qty: </h5>
          <select
            onChange={(e) => handleChange(e, data.cart, data)}
            name="qty"
            defaultValue={data.cart ? data.data.qty : qty}
          >
            {[...Array(data.data.data.stock + 1).keys()]
              .slice(1)
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
          {!data.cart && <p>stock: {data.data.data.stock}</p>}
        </td>
      </tr>
      <tr>
        <td />
        <td>
          {!data.cart && <AddToCart data={data.data} qty={qty} />}
        </td>
      </tr>
    </>
  )
}
