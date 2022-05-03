import React from 'react'
import styled from 'styled-components'

const MainSpace = styled.div`
  border-top: 2.5vw solid #e6e6e6;
  height: 1.5vw;
  background-color: #e6e6e6;
  @media (max-width: 900px) {
    height: 5vw;
  }
`

export default function Space() {
  return <MainSpace />
}
