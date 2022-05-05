/* eslint-disable no-unused-expressions */
import React, { useContext } from "react";
import styled from "styled-components";
import ListContext from "../../states/ListContext";

const ProducttoCart = styled.button``;

function handleClick(e, data, cartItems, setCartItems, quantity) {
  e.preventDefault();
  let item = data.data;
  let matches = cartItems.filter((existingItemns) =>
    existingItemns.id.includes(item.id)
  );

  matches.length
    ? setCartItems(
        cartItems.map((existingItem) =>
          existingItem.id === item.id
            ? existingItem.qty + quantity > existingItem.data.stock
              ? { ...existingItem, qty: existingItem.data.stock }
              : { ...existingItem, qty: existingItem.qty + quantity }
            : existingItem
        )
      )
    : setCartItems([...cartItems, { ...item, qty: quantity }]);
}
export default function AddToCart(data, { qty }) {
  const { cartItems, setCartItems } = useContext(ListContext);
  return (
    <ProducttoCart
      onClick={(e) => handleClick(e, data, cartItems, setCartItems, data.qty)}
    >
      Add to Cart
    </ProducttoCart>
  );
}
