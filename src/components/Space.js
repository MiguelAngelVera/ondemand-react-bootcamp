import React from 'react';
import styled from 'styled-components';

const MainSpace = styled.div`
  height: 1.5vw;
  background-color: #E6E6E6;
  @media(max-width: 900px)
        {height: 10vw;}    
`;


export default function Space(){
    return(
        <MainSpace>
        </MainSpace>
        
    )
}