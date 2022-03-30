import React from 'react';
import styled from 'styled-components';

const Text= styled.div`
    min-height: 10vw;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align:center;
    font-size: 1vw;
    @media(max-width: 900px)
        {font-size: 2vw;
        min-height: 31vw;}  
`

export default function Footer(){
    return(
    <>
        <Text>Ecommerce created during Wizeline’s Academy React Bootcamp</Text>
    </>
    )
}