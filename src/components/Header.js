import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MainLogo } from '../utils/assets/main-logo.svg';
import { ReactComponent as CartLogo } from '../utils/assets/cart-logo.svg';
import { ReactComponent as SearchLogo } from '../utils/assets/search-icon.svg';

const MainLogoIcon = styled(MainLogo)``;
const CartLogoIcon = styled(CartLogo)``;
const SearchIcon = styled(SearchLogo)``;
// const MyComponent = () => {
//     const { width } = useViewport()
//     const breakpoint = 757;
  
//     return width < breakpoint ? <NavBar2></NavBar2>:<NavBar2></NavBar2>;
//   }

const MainHeader = styled.div`
  background-color: #F7DC6F;
  align-items: center;
`;
const BarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 110px;
  @media(max-width: 900px) 
    {padding: 0px 5px;
    height: 60px;}
`;


const Left =  styled.div`
    align-items: center;
    display: flex;
    flex: 5;
    justify-content: flex-end;
    margin-right: 3%;
    @media(max-width: 900px)   
        {margin-right: 6%;}
`;
const ShopName = styled.div`
    padding: 0% 2%;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    @media(max-width: 900px)
        {font-size: 15px}  
`


const Mid =  styled.div`
    align-items: center;
    flex: 3;
    background-color: white;
    @media(max-width: 900px)
        {flex: 9}
`;
const SearchBar =  styled.div`
    border: 10% solid gray;
    display: flex;
    padding: 2.5%;
    justify-content: flex-end;
`;
const SearchInput = styled.input`
    border: none;
    margin-right: 10%;
    background-color: white;
    width:100%;
`


const Right =  styled.div`
    flex: 10;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 3%;
    @media(max-width: 900px)
    {flex:5}

`;
const SignBlock = styled.div`
    margin-right: 10%;
`

const Sign = styled.div`
    @media(max-width: 900px)
        {font-size: 13px;
        margin-right: 10%}
`

function NavBar(){
    return(
        <BarWrapper >
        <meta name="viewport" 
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        </meta>
        <Left>
            <MainLogoIcon></MainLogoIcon>
            <ShopName>
                <div>Wize</div>
                <div>shop</div>
            </ShopName>
        </Left>
        <Mid>
            <SearchBar>
                <SearchInput></SearchInput>
                    <SearchIcon></SearchIcon>
            </SearchBar>
        </Mid>
        <Right>
            <SignBlock>
                <Sign>Register</Sign>
                <Sign>Sign In</Sign>
            </SignBlock>
            <CartLogoIcon></CartLogoIcon>
        </Right>

    </BarWrapper>
    )
}

export default function Header(){
    return(
        <MainHeader>
            <NavBar></NavBar>
        </MainHeader>
    )
}