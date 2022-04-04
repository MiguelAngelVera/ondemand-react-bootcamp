import MockBanner from "../../mocks/en-us/featured-banners.json"
import React, { useRef, useEffect } from 'react';
import * as styles from './Banner-style';

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

    // useEffect(()=>{
    //     setInterval(() => {
    //         Slider();
    //         },2500)
    //     return()
    // },[])

    useEffect(()=>{
        const autoChange = setInterval(() => {
                Slider();
            },2500)
        return()=>clearInterval(autoChange)

    },[])


    const BannerBox = (item) => {
        const image = item.data.main_image
        return (
            <img src={image.url} alt={image.alt} title={image.alt}></img> 
        );
      };

    return(
        <>
            <styles.Title>Popular Products</styles.Title>
            <styles.Container>
                <styles.SlideContainer ref={slideref}>
                    {banner.results.map((item) =>
                        <styles.BannerStyle key={item.id}>
                            <BannerBox {...item}></BannerBox>
                        </styles.BannerStyle>)}
                </styles.SlideContainer>
            </styles.Container>
        </>
    )
}