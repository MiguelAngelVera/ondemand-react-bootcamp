import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MainLogo } from '../../utils/assets/main-logo.svg';
import { ReactComponent as CartLogo } from '../../utils/assets/cart-logo.svg';
import { ReactComponent as SearchLogo } from '../../utils/assets/search-icon.svg';
import * as styles from './Header-style'

const MainLogoIcon = styled(MainLogo)``;
const CartLogoIcon = styled(CartLogo)``;
const SearchIcon = styled(SearchLogo)``;
// const MyComponent = () => {
//     const { width } = useViewport()
//     const breakpoint = 757;
  
//     return width < breakpoint ? <NavBar2></NavBar2>:<NavBar2></NavBar2>;
//   }


function NavBar({action}){
    return(
        <styles.BarWrapper >
        <meta name="viewport" 
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        </meta>
        <styles.Left onClick={_=>{action(true)}}>
            <MainLogoIcon></MainLogoIcon>
            <styles.ShopName>
                <div>Wize</div>
                <div>shop</div>
            </styles.ShopName>
        </styles.Left>
        <styles.Mid>
            <styles.SearchBar>
                <styles.SearchInput></styles.SearchInput>
                    <SearchIcon></SearchIcon>
            </styles.SearchBar>
        </styles.Mid>
        <styles.Right>
            <styles.SignBlock>
                <styles.Sign>Register</styles.Sign>
                <styles.Sign>Sign In</styles.Sign>
            </styles.SignBlock>
            <CartLogoIcon></CartLogoIcon>
        </styles.Right>

    </styles.BarWrapper>
    )
}

export default function Header({change}){
    return(
        <styles.MainHeader>
            <NavBar action={change}></NavBar>
        </styles.MainHeader>
    )
}