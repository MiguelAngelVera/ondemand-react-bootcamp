import MockBanner from "../mocks/en-us/featured-banners.json"
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    overflow: hidden;
    background-color: #E6E6E6;
    height:30vw;
    align-items: center;
    @media(max-width: 900px){
        height: 50vw;    }
`

const SlideContainer = styled.div`
    display:flex;
    flex-wrap:nowrap;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
    background-color: #E6E6E6;
    margin: 0 auto;
    transition: .3s ease all;
    @media(max-width: 900px){
        height: 50vw;       
    }
`

const BannerStyle = styled.div`
    display:flex;
    align-items: center;
    background-color:#DEDEDE;
    transition: .3s ease all;
    min-width: 100%;
    height:80%;
    transition: .3s ease all;
        img {
            height: 100%;
            display: block;        
            margin-top:center;
            margin-left: auto;
            margin-right: auto;

        };        
`
const Title = styled.div`
    padding: 0 6vw;
    background-color: #E6E6E6;
    font-size: 1.1vw;
    color:gray;
    @media(max-width: 900px)
        {font-size: 3vw;}  
`


export default function Banner(){
    const banner = MockBanner
    

    const slideref = useRef(null);

    const Slider = () => {
        if(slideref.current.children.length > 0){
            const firstElement = slideref.current.children[0];

            slideref.current.style.transition = `700ms ease-in all`;
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
        setInterval(() => {
            Slider();
            },2500)
    },[])


    const BannerBox = (item) => {
        const image = item.data.main_image
        return (
            <img src={image.url} alt={image.alt} title={image.alt}></img> 
        );
      };

    return(
        <>
            <Title>Popular Products</Title>
            <Container>
                <SlideContainer ref={slideref}>
                    {banner.results.map((item) =>
                        <BannerStyle key={item.id}>
                            <BannerBox {...item}></BannerBox>
                        </BannerStyle>)}
                </SlideContainer>
            </Container>
        </>
    )
}