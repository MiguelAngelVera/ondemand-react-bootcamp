import MockBanner from "../mocks/en-us/featured-banners.json"
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    overflow: hidden;
    background-color: #E6E6E6;
`
const SlideContainer = styled.div`
    display:flex;
    flex-wrap:nowrap;
    justify-content: space-between;
    align-items: center;
    height: 560px;
    width:100%;
    background-color: #E6E6E6;
    margin: 0 auto;
    min-width: 100%;
        transition: .3s ease all;
    @media(max-width: 900px){
        height: 50vw;       
    }
`

const BannerStyle = styled.div`
    justify-content: center;
    background-color:#DEDEDE;
    position:relative;
    transition: .3s ease all;
    min-width: 100%;
        transition: .3s ease all;
        img {
            width: 90%;
            display: block;
            margin-left: auto;
            margin-right: auto;
        };        
`

export default function Banner(){
    const [banner, setBanner] = useState(MockBanner)
    

    const slideref = useRef(null);

    const Slider = () => {
        if(slideref.current.children.length > 0){
            const firstElement = slideref.current.children[0];

            slideref.current.style.transition = `500ms ease-in all`;
            slideref.current.style.transform = `translateX(-100%)`;
            const append = () => {
                slideref.current.style.transition = 'none';
                slideref.current.style.transform = `translateX(0)`;
                slideref.current.appendChild(firstElement);
                slideref.current.removeEventListener('transitionend', append);
            }
            slideref.current.addEventListener('transitionend', append);
        } 
    }

    useEffect(()=>{
        const autoChange = setInterval(() => {
            Slider();
            },3500)
            // slideref.current.addEventListener('mouseenter', () => {
            // clearInterval(autoChange)})
    },[])


    const BannerBox = (item) => {
        const image = item.data.main_image
        return (
            <img src={image.url} alt={image.alt} title={image.alt}></img> 
        );
      };

    return(
        <>
            <Container>
                <SlideContainer ref={slideref}>
                    {banner.results.map((item) =>
                        <BannerStyle>
                            <BannerBox {...item}></BannerBox>
                        </BannerStyle>)}
                </SlideContainer>
            </Container>
        </>
    )
}