import React, { useContext } from "react";
import ListContext from "../../states/ListContext";
import Space from "../Space";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShoppingProd from "./ShoppingProd";

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
