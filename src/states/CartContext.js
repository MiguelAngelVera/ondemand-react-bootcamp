import {createContext, useState} from 'react'

const CartContext = createContext({cartItems: '', setCartItems: () => {}})
const CartContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])
  const data = {cartItems, setCartItems}
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}
export {CartContextProvider}
export default CartContext
