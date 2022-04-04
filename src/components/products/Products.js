//import React, { useState, useEffect } from 'react';
import products from '../../mocks/en-us/featured-products.json'
import * as styles from './Products-style'



function Image (element){
    return(
    <>
        <styles.ProductImage>
            <img src={element.data.mainimage.url} alt={element.data.id}></img>
            <styles.Line></styles.Line>
            <styles.ProductText>
                <styles.ProductPrice>${element.data.price}</styles.ProductPrice>
                <styles.ProductName>{element.data.name}</styles.ProductName>
                <styles.ProductCategory>{element.data.category.slug.toUpperCase()}</styles.ProductCategory>
            </styles.ProductText>
        </styles.ProductImage>
        
    </>
    )
}

export default function Products(){
    const productslist = products

    return(
        <>
            <styles.Title>
                <div>Top Sellers</div>
                {/* <button onClick={handleClick}>
                    {"View all products >"}
                </button> */}
            </styles.Title>
            <styles.ContainerBackground>
                <styles.Container>
                    {productslist.results.map((element)=>
                        <styles.ProductContainer key={element.data.sku}>
                            <Image  {...element}></Image>
                        </styles.ProductContainer>)}
                    
                </styles.Container>
            </styles.ContainerBackground>
        </>
    )

}