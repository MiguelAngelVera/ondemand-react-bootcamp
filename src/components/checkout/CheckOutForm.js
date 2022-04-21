import React, { useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ShoppingProd from "../cart/ShoppingProd";
import ListContext from "../../states/ListContext";
import Space from "../Space";
import { Link } from "react-router-dom";
import Cart from "../../pages/cart/Cart";
import CartContext from "../../states/CartContext";
import CheckOutButtons from "./CheckOutButtons";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

const ProductsContainer = styled.div`
  width: 48.5%;
  margin: 0 auto;
  margin-top: 3vw;
  @media (max-width: 900px) {
    width: 80%;
    margin-top: 7vw;
  }
`;

const Title = styled.h1``;
const Wrapper = styled.div``;
const CheckoutForm = styled.form`
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;
const FormWrapper = styled.div`
  width: 40%;
  margin: 0 16vw;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FormTitle = styled.h3`
  margin-bottom: 2vw;
  margin-top: 2vw;
`;

const LabelName = styled.label`
  margin-bottom: 0.3vw;
`;
const InputName = styled.input`
  width: 21vw;
  @media (max-width: 900px) {
    width: 65vw;
  }
`;

const LabelEmail = styled.label`
  margin-bottom: 0.3vw;
`;
const InputEmail = styled.input`
  width: 21vw;
  @media (max-width: 900px) {
    width: 65vw;
  }
`;

const LabelZipCode = styled.label`
  margin-bottom: 0.3vw;
`;
const InputZipCode = styled.input`
  width: 21vw;
  @media (max-width: 900px) {
    width: 65vw;
  }
`;

const LabelInstructions = styled.label`
  margin-bottom: 0.3vw;
`;
const InputInstructions = styled.textarea`
  resize: none;
  width: 21vw;
  min-height: 10vw;
  @media (max-width: 900px) {
    width: 65vw;
  }
`;

const Separator = styled.div`
  margin-bottom: 1vw;
  display: flex;
  flex-direction: column;
`;
const Total = styled.p`
  text-align: right;
`;

export default function CheckOutForm() {
  window.scrollTo(0, 0);
  const { cartItems } = useContext(ListContext);

  const [form, setForm] = useState([]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Space></Space>
      <Container>
        <Title>Checkout</Title>
        <Wrapper>
          <FormTitle>Add your Information</FormTitle>
          <CheckoutForm>
            <FormWrapper>
              <Separator>
                <LabelName htmlFor="name">Name: </LabelName>
                <InputName
                  name="name"
                  id="name"
                  onChange={handleChange}
                ></InputName>
              </Separator>
              <Separator>
                <LabelEmail htmlFor="email">Email: </LabelEmail>
                <InputEmail
                  name="email"
                  id="email"
                  onChange={handleChange}
                ></InputEmail>
              </Separator>
              <Separator>
                <LabelZipCode htmlFor="zip">Zip Code: </LabelZipCode>
                <InputZipCode
                  name="zip"
                  id="zip"
                  onChange={handleChange}
                ></InputZipCode>
              </Separator>
              <Separator>
                <LabelInstructions htmlFor="instructions">
                  Delivery Instructions:
                </LabelInstructions>
                <InputInstructions
                  name="instructions"
                  id="instructions"
                  onChange={handleChange}
                ></InputInstructions>
              </Separator>
            </FormWrapper>
          </CheckoutForm>
        </Wrapper>
      </Container>
      <ProductsContainer>
        <ShoppingProd checkout={true}></ShoppingProd>
        <Total>
          <b>
            Total: $
            {cartItems.length
              ? cartItems
                  .map((item) => item.data.price * item.qty)
                  .reduce((acc, curr) => acc + curr)
              : 0}
          </b>
        </Total>
      </ProductsContainer>
      <CheckOutButtons></CheckOutButtons>
      <Space></Space>
      <Space></Space>
    </>
  );
}
