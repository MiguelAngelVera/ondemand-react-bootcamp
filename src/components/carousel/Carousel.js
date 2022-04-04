import React from 'react';
import styled from 'styled-components';
import categories from '../../mocks/en-us/product-categories.json'
import { useState, useRef } from 'react';
import * as styles from './Carousel-style'

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
            <styles.CardText>
            {image.alt}
            </styles.CardText>
            </>
        );
      };
    return(
        <>
        <styles.Title>Departments</styles.Title>
        <styles.Container>
            <styles.CardBackground>
                <styles.CardContainer ref={carouselslide}>    
                        {carousel.results.map((item) =>
                            <styles.Card key={item.id} > 
                                <CarouselBox {...item} /> 
                            </styles.Card>
                            )}
                </styles.CardContainer>
            </styles.CardBackground>
            <styles.Arrow change="prev" onClick={Prev}>{"<"}</styles.Arrow>
            <styles.Arrow change="next" onClick={Next}>{">"}</styles.Arrow>
            
        </styles.Container>
        </>
    )
} 