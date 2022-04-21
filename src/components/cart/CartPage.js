import React, { useContext, useState } from "react";
import ListContext from "../../states/ListContext";
import Space from "../Space";
import styled from "styled-components";
import { AstPath } from "prettier";
import AddToCart from "./AddToCart";
import Selector from "../productDetail/Selector";
import CartSelector from "./CartSelector";
import { Link } from "react-router-dom";
import ShoppingProd from "./ShoppingProd";
import CartContext from "../../states/CartContext";

const Container = styled.section`
  width: 85%;
  margin: 0 auto;
`;
const Tittle = styled.h1``;
const Wrapper = styled.div``;
const Top = styled.div``;
const Total = styled.p`
  text-align: right;
`;
const Medium = styled.div``;
const ProductsTable = styled.table``;
const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  background-color: white;
`;
const Image = styled.img`
  width: 130px;
  @media (max-width: 900px) {
    width: 50%;
    height: 50%;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  padding: 0 15px;
  @media (max-width: 900px) {
    display: inline;
    width: 50%;
  }
`;
const Text = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 900px) {
    padding: 0;
    font-size: 3vw;
  }
`;

const Price = styled.span``;
const Name = styled.span``;
const Category = styled.span``;

const CartActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: auto;
  margin-right: 10px;
`;

const CheckoutButton = styled.button`
  background-color: #6495ed40;
  color: #6495ed;
  border-width: 0;
  font-size: 1.3vw;
  @media (max-width: 900px) {
    font-size: 5vw;
    width: 100vw;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 2vw;
  @media (max-width: 900px) {
    justify-content: center;
    font-size: 5vw;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
`;
export default function CartPage() {
  const { cartItems } = useContext(ListContext);

  window.scrollTo(0, 0);
  return (
    <>
      <Space></Space>
      <Container>
        <Tittle>Your Cart</Tittle>
        <Wrapper>
          <Top>
            <Total>
              <b>
                Total: $
                {cartItems.length
                  ? cartItems
                      .map((item) => item.data.price * item.qty)
                      .reduce((acc, curr) => acc + curr)
                      .toFixed(2)
                  : 0}
              </b>
            </Total>
          </Top>
          <ShoppingProd></ShoppingProd>
          <Bottom>
            <Link
              to="/ondemand-react-bootcamp/checkout"
              style={{ textDecoration: "none" }}
            >
              {cartItems.length ? (
                <CheckoutButton>Checkout</CheckoutButton>
              ) : null}
            </Link>
          </Bottom>
        </Wrapper>
      </Container>
      <Space></Space>
      <Space></Space>
    </>
  );
}
