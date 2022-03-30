import React from 'react';
import styled from 'styled-components';
import categories from '../mocks/en-us/product-categories.json'
import { useState, useRef } from 'react';


const Container = styled.div`
   // background-color:#DEDEDE;
    overflow: hidden;
    width:100%;
    height: 15vw;
    display:flex;
    background-color: #E6E6E6;
    position:relative;
    align-items: center;
    @media(max-width: 900px) {
        height: 30vw;      
    }

`
const Arrow = styled.button`
    cursor: pointer;
    pointer-events:all;
    width: 40px;
    height: 40px;
    background-color: gray;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
    position:absolute;
    top:0;
    bottom:0;
    left: ${props=>props.change === "prev" && "10px"};
    right: ${props=>props.change === "next" && "10px"};
    margin:auto;
    opacity:0%;
    display:none;
    @media(max-width: 900px) 
    {
        font-size: 10px;
        width: 20px;
        height: 20px;
        background-color: gray;
        border-radius: 50%;
        display:flex;
        align-items: center;
        justify-content: center;
        position:absolute;
        top:0;
        bottom:0;
        left: ${props=>props.change === "prev" && "50px"};
        right: ${props=>props.change === "next" && "50px"};
        opacity:60%;
        margin:auto;
    }

`
const CardContainer = styled.div`
    display:flex;
    flex-wrap:nowrap;
    justify-content: space-between;
    align-items: center;
    height:100%;
    width:90%;
    background-color:#DEDEDE;
    margin: 0 auto;
    @media(max-width: 900px){
        width:100%;        
    }
`
const CardBackground = styled.div`
    background-color:#DEDEDE;
`
const Card = styled.div`
    justify-content: center;
    position:relative;
    display:flex;
    img {
        width: 90%;
    };
    @media(max-width: 900px){
        min-width: 100%;
        transition: .3s ease all;
        img {
            width: 35%;
            display: block;
            margin-left: auto;
            margin-right: auto;
        };
    }; 
`
const CardText = styled.div`
    line-height:1.5vw;
    height: 1.5vw; 
    background: rgba(0,0,0,.5);
    color: white;
    width: 90%;
    text-align:center;
    position: absolute;
    bottom:0;
    font-size: 1.3vw;
    @media(max-width: 900px){
        line-height:3.5vw;
        height: 4vw; 
        font-size: 3vw;
        margin:auto;
        width:35%;
    }
`

const Title = styled.div`
    padding: 0 6vw;
    background-color: #E6E6E6;
    font-size: 1.5vw;
    color:gray;
    @media(max-width: 900px)
        {font-size: 15px}  
`


export default function Grid(){

    const carouselslide = useRef(null);
    const [carousel, setCarousel] = useState(categories);

    const Next = () => {
        if(carouselslide.current.children.length > 0){
            const firstElement = carouselslide.current.children[0];

            carouselslide.current.style.transition = `350ms ease-in all`;
            carouselslide.current.style.transform = `translateX(-100%)`;
            const append = () => {
                carouselslide.current.style.transition = 'none';
                carouselslide.current.style.transform = `translateX(0)`;
                carouselslide.current.appendChild(firstElement);
                carouselslide.current.removeEventListener('transitionend', append);
            }
            carouselslide.current.addEventListener('transitionend', append);
        } 
    }
    
    const Prev = () => {
        if(carouselslide.current.children.length > 0){
            const index = carouselslide.current.children.length - 1
            const lastElement = carouselslide.current.children[index];
            carouselslide.current.insertBefore(lastElement, carouselslide.current.firstChild);
            carouselslide.current.style.transition = 'none';
            carouselslide.current.style.transform = `translateX(-100%)`;
            setTimeout(()=>{
                carouselslide.current.style.transition = '350ms ease-in all';
                carouselslide.current.style.transform = `translateX(0)`;                
            },30)
        }  
    }

    // useEffect(()=>{
    //     const autoChange = setInterval(() => {
    //             Next();
    //         },3500)
    //     carouselslide.current.addEventListener('mouseenter', () => {
    //         clearInterval(autoChange)})

    // },[])

    const CarouselBox = (item) => {
        const image = item.data.main_image
        return (
            <>
            <img src={image.url} alt={image.alt} title={image.alt}></img>
            <CardText>
            {image.alt}
            </CardText>
            </>
        );
      };
    return(
        <>
        <Title>Categorias Populares</Title>
        <Container>
            <CardBackground>
                <CardContainer ref={carouselslide}>    
                        {carousel.results.map((item) =>
                            <Card key={item.id} > 
                                <CarouselBox {...item} /> 
                            </Card>
                            )}
                </CardContainer>
            </CardBackground>
            <Arrow change="prev" onClick={Prev}>{"<"}</Arrow>
            <Arrow change="next" onClick={Next}>{">"}</Arrow>
            
        </Container>
        </>
    )
} 