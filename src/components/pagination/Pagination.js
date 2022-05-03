import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import ListContext from '../../states/ListContext'
import './Pagination.css'

export default function Pagination({postPerPage, totalPosts}) {
  const {setCurrentPage, activeItem, setActiveItem} = useContext(ListContext)
  const pageNumbers = []

  const handleClick = (e, number) => {
    setCurrentPage(e.target.name)
    setActiveItem(number)
    window.scrollTo(0, 0)
  }

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i += 1) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="Pages">
        {pageNumbers.map((number) => (
          <li key={number} className="Page">
            <button
              type="button"
              key={number}
              name={number}
              onClick={(e) => handleClick(e, number)}
              className={activeItem === number ? 'PageButtonOn' : 'PageButton'}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  postPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
}
