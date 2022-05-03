import React, {useContext, useState} from 'react'
import ListContext from '../../states/ListContext'
import {Paginate} from '../productFilter/ProductList-style'
import './Pagination.css'

export default function Pagination({postPerPage, totalPosts}) {
  const {setCurrentPage, activeItem, setActiveItem} = useContext(ListContext)
  const pageNumbers = []

  const handleClick = (e, number) => {
    setCurrentPage(e.target.name)
    setActiveItem(number)
    window.scrollTo(0, 0)
  }

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="Pages">
        {pageNumbers.map((number) => (
          <li key={number} className="Page">
            <button
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
