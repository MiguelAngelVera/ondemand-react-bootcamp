import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const CheckoutButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 30%;
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 70%;
  }
`

const BackButton = styled.button`
  width: 10vw;
  background-color: #4b454430;
  color: #4b4544;
  border-width: 0;
  font-size: 1vw;
  @media (max-width: 900px) {
    width: auto;
    font-size: 4vw;
  }
`

const ProceedButton = styled.button`
  width: 10vw;
  background-color: #6495ed50;
  color: #6495ed;
  border-width: 0;
  font-size: 1.3vw;
  @media (max-width: 900px) {
    width: auto;
    font-size: 5vw;
  }
`
export default function CheckOutButtons() {
  return (
    <CheckoutButtons>
      <Link to="/ondemand-react-bootcamp/cart" style={{textDecoration: 'none'}}>
        <BackButton>Go Back To Cart</BackButton>
      </Link>
      {/* {cartItems.length ? <ProceedButton>Place Order</ProceedButton> : null} */}
      <ProceedButton>Place Order</ProceedButton>
    </CheckoutButtons>
  )
}
