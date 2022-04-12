import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as MainLogo } from "../../utils/assets/main-logo.svg";
import { ReactComponent as CartLogo } from "../../utils/assets/cart-logo.svg";
import { ReactComponent as SearchLogo } from "../../utils/assets/search-icon.svg";
import * as styles from "./Header-style";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MainLogoIcon = styled(MainLogo)``;
const CartLogoIcon = styled(CartLogo)``;
const SearchIcon = styled(SearchLogo)``;

function NavBar() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const handleChange = (event) => setSearchString(event.target.value);
  const handleSearch = (event) => (
    navigate(`/search?q=${searchString.toLowerCase()}`),
    event.preventDefault(),
    setSearchString("")
  );
  return (
    <styles.BarWrapper>
      <styles.Left>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <MainLogoIcon></MainLogoIcon>
        </Link>
      </styles.Left>

      <styles.Mid>
        <styles.SearchBar>
          <form style={{ display: "flex" }} onSubmit={handleSearch}>
            <styles.SearchInput
              style={{ outline: "none" }}
              type="text"
              placeholder="Search..."
              value={searchString}
              onChange={handleChange}
            ></styles.SearchInput>
            <button
              style={{ backgroundColor: "white", borderWidth: "0" }}
              type="submit"
            >
              <SearchIcon></SearchIcon>
            </button>
          </form>
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
  );
}

export default function Header() {
  return (
    <styles.MainHeader>
      <NavBar></NavBar>
    </styles.MainHeader>
  );
}
