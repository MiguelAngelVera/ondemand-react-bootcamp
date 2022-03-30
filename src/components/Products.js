//import React, { useState, useEffect } from 'react';
import products from '../mocks/en-us/featured-products.json'
import styled from 'styled-components';

const ContainerBackground = styled.div`
    background-color: #E6E6E6;  
`

const Container = styled.div`
    width:80%;  
    margin: 0 auto;  
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(30vw,30vw);
    background-color: #E6E6E6;
    justify-content: center;
    display: grid;
    row-gap: 4rem;
    column-gap: 0.1rem;
    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: minmax(70vw,70vw);
        column-gap: 0rem;
    }

`
const ProductContainer = styled.div`
    height:100%;
    display: flex;
    justify-content: center;
    background-color: #E6E6E6;

    
`

const ProductImage = styled.div`
background-color:white;
border-radius: 7px;
        width: 70%;
        img {
            object-fit: cover;
            width: 80%;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
`

const Line = styled.div`
    margin: auto 13px;
    border: .6px solid gray;
    opacity: 30%;
`

const ProductText = styled.div`
    position: relative;
    height:100%;
    padding: 3.5vw 1.5vw;

    @media (max-width: 900px){
        padding:4.5vw 4.5vw;
    }
`
const ProductName = styled.div`
    font-size: 1vw;
    color: gray;
    @media (max-width: 900px){
        font-size: 2.7vw;     
    }
`

const ProductPrice = styled.div`
    font-size: 1.8vw;
    @media (max-width: 900px){
        font-size: 4vw;     
    }
`

const ProductCategory = styled.div`
    position: absolute;
    font-size: .9vw;
    color: gray;
    top: 0;
    @media (max-width: 900px){
        font-size: 2.2vw;  
        
    }
`
const Title = styled.div`
    padding: 0 6vw;
    background-color: #E6E6E6;
    font-size: 1.5vw;
    color:gray;
    height:5vw;
    @media(max-width: 900px)
        {font-size: 15px;
        height:12vw;}  
`

function Image (element){
    return(
    <>
        <ProductImage>
            <img src={element.data.mainimage.url} alt={element.data.id}></img>
            <Line></Line>
            <ProductText>
                <ProductPrice>${element.data.price}</ProductPrice>
                <ProductName>{element.data.name}</ProductName>
                <ProductCategory>Category: {element.data.category.slug}</ProductCategory>
            </ProductText>
        </ProductImage>
        
    </>
    )
}

export default function Products(){
    const productslist = products
    return(
        <>
            <Title>Los mas Comprados</Title>
            <ContainerBackground>
                <Container>
                    {productslist.results.map((element)=>
                        <ProductContainer key={element.data.sku}>
                            <Image  {...element}></Image>
                        </ProductContainer>)}
                    
                </Container>
            </ContainerBackground>
        </>
    )

}