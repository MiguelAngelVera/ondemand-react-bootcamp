/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as MainLogo} from '../../utils/assets/main-logo.svg'
import {ReactComponent as SearchLogo} from '../../utils/assets/search-icon.svg'
import * as styles from './Header-style'
import HeaderCart from './HeaderCart'

const MainLogoIcon = styled(MainLogo)``

const SearchIcon = styled(SearchLogo)``

function NavBar({search}) {
  const navigate = useNavigate()
  const [searchString, setSearchString] = useState('')
  const handleChange = (event) => {
    setSearchString(event.target.value)
  }
  const handleSearch = (event) => {
    navigate(`/ondemand-react-bootcamp/search?q=${searchString.toLowerCase()}`)
    event.preventDefault()
    setSearchString('')
  }
  useEffect(() => {
    setSearchString(search)
  }, [])

  return (
    <styles.BarWrapper>
      <styles.Left>
        <Link
          to="/ondemand-react-bootcamp/home"
          style={{textDecoration: 'none'}}
        >
          <MainLogoIcon />
        </Link>
      </styles.Left>

      <styles.Mid>
        <styles.SearchBar>
          <form style={{display: 'flex'}} onSubmit={handleSearch}>
            <styles.SearchInput
              style={{outline: 'none'}}
              type="text"
              placeholder="Search..."
              value={searchString}
              onChange={handleChange}
            />
            <button
              aria-label="searchButton"
              style={{backgroundColor: 'white', borderWidth: '0'}}
              type="submit"
            >
              <SearchIcon />
            </button>
          </form>
        </styles.SearchBar>
      </styles.Mid>
      <styles.Right>
        <styles.SignBlock>
          <styles.Sign>Register</styles.Sign>
          <styles.Sign>Sign In</styles.Sign>
        </styles.SignBlock>
        <HeaderCart />
      </styles.Right>
    </styles.BarWrapper>
  )
}

export default function Header({search}) {
  return (
    <styles.MainHeader>
      <NavBar search={search} />
    </styles.MainHeader>
  )
}

NavBar.propTypes = {
  search: PropTypes.string.isRequired,
}
Header.propTypes = {
  search: PropTypes.string.isRequired,
}
