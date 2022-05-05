import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {ReactComponent as CartLogo} from '../../utils/assets/cart-logo.svg'
import ListContext from '../../states/ListContext'

const CartLogoIcon = styled(CartLogo)``
const Container = styled.div`
  display: flex;
  align-items: center;
`
const NumberOfItems = styled.h5`
  background-color: black;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
`

export default function HeaderCart() {
  const {cartItems} = useContext(ListContext)
  return (
    <Container>
      <Link to="/ondemand-react-bootcamp/cart" style={{textDecoration: 'none'}}>
        <CartLogoIcon />
      </Link>
      {cartItems.length ? (
        <NumberOfItems aria-label="numberOfProducts">
          {cartItems.map((item) => item.qty).reduce((acc, curr) => acc + curr)}
        </NumberOfItems>
      ) : null}
    </Container>
  )
}
