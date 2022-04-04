import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Space from './Space';
import categories from '../../mocks/en-us/product-categories.json'
import products from '../../mocks/en-us/featured-products.json'
import * as styles from './ProductFilter-style'


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



export default function ProductFilter(){
    const list = categories;
    const totalCategories = Object.keys(list.results).length
    const productlist = products;
    const [searchFor, setSearchFor] = useState('')
    const [filteredProducts, setFilteredProducts] = useState('')
    const [defaultfiltered, setDefaultfiltered] = useState([])
    let encuentro = ''
    let temp = ''

    useEffect(()=>{
        const deffun = () => (
            setDefaultfiltered(productlist.results.filter(it => it.data.category.slug.toLowerCase().includes(''.toLowerCase()))))
        const timer = setTimeout(()=>(
            deffun()
        ),2000)
        return()=>clearTimeout(timer)
    },[])
    
    useEffect(()=>{
        window.scrollTo(0, 0)
        const keys = Object.keys(searchFor)
        const indexKey = keys[0]
        const fun = (encuentro) => (
            keys.length ? (
                setDefaultfiltered(productlist.results.filter(it => it.data.category.slug.toLowerCase().includes(''.toLowerCase()))),
                encuentro = productlist.results.filter(it => it.data.category.slug.toLowerCase().includes(searchFor[indexKey].toLowerCase())),
                !encuentro.length && (searchFor[indexKey] === "fallo") ? (
                    temp = filteredProducts,
                    delete temp[indexKey],
                    setFilteredProducts(temp)
                ):( 
                    setFilteredProducts({...filteredProducts, [indexKey]:encuentro})
                )
            )
        :{})
        fun(encuentro)
        // const timer = setTimeout(()=>(
        //     deffun(),
        //     console.log('hola')
        // ),2000)
        // return()=>clearTimeout(timer)
    },[searchFor,productlist])
    

    const Filtering = (e,categoryClicked,itemid) => {
        e.target.style.color === 'gray' ? ( setSearchFor({[categoryClicked]:categoryClicked})
            ) : setSearchFor({[categoryClicked]:"fallo"})
     
        e.target.style.color === 'gray' ? e.target.style.color = 'blue' : e.target.style.color = 'gray'
    }
    return(
        <>
            {/* <Space></Space> */}
            <styles.Container>
                <styles.NavBarContainer>
                    <styles.NavBarCard>
                        <div>
                            <h1>
                                Products
                            </h1>
                            <h2>
                                Categories ({totalCategories})
                            </h2>
                        </div>
                        <ul>
                                <styles.NavBarList> 
                                    {list.results.map((item) =>(
                                        <li key={item.id} style={{color:"gray"}} name={item.id} >
                                            <h3 onClick={(e) => Filtering(e,item.data.name,item.id)} style={{color:"gray"}} >{item.data.name}</h3>
                                        </li>))}
                                </styles.NavBarList>
                        </ul>
                    </styles.NavBarCard>
                </styles.NavBarContainer>
                <styles.ProductContainer>
                    {
                        Object.keys(filteredProducts).length !== 0 ? (
                            Object.keys(filteredProducts).map ((item)=>(
                                filteredProducts[item].length ? (
                                    filteredProducts[item].map ((item)=>(
                                        <styles.ProductCard key={item.data.sku}>
                                            <Image  {...item}></Image>
                                        </styles.ProductCard>     
                                    ))
                                ):(null)
                            ))
                        ):(
                            Object.keys(defaultfiltered).length !== 0 ? (
                                defaultfiltered.map ((item)=>(
                                    <styles.ProductCard key={item.data.sku}>
                                        <Image  {...item}></Image>
                                    </styles.ProductCard> ))):(<div>Cargando...</div>)
                            )
                    }
                </styles.ProductContainer>
            </styles.Container>
            <styles.Paginate>
                    <styles.Arrow change="prev">{"<"}</styles.Arrow>
                    <styles.Arrow change="next">{">"}</styles.Arrow>
            </styles.Paginate>
        </>
    )
}