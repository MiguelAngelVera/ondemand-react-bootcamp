import styled from "styled-components";

export const ContainerBackground = styled.div`
    background-color: #E6E6E6;  
`

export const Container = styled.div`
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
export const ProductContainer = styled.div`
    height:100%;
    display: flex;
    justify-content: center;
    background-color: #E6E6E6;

    
`

export const ProductImage = styled.div`
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

export const Line = styled.div`
    margin: auto 13px;
    border: .6px solid gray;
    opacity: 30%;
`

export const ProductText = styled.div`
    position: relative;
    height:100%;
    padding: 3.5vw 1.5vw;

    @media (max-width: 900px){
        padding:4.5vw 4.5vw;
    }
`
export const ProductName = styled.div`
    font-size: 1vw;
    color: gray;
    @media (max-width: 900px){
        font-size: 2.7vw;     
    }
`

export const ProductPrice = styled.div`
    font-size: 1.8vw;
    @media (max-width: 900px){
        font-size: 4vw;     
    }
`

export const ProductCategory = styled.div`
    position: absolute;
    font-size: .7vw;
    color: gray;
    top: 0;
    @media (max-width: 900px){
        font-size: 1.6vw;  
        
    }
`
export const Title = styled.div`
    justify-content: space-between;
    align-items: center;
    display:flex;
    padding: 0 6vw;
    background-color: #E6E6E6;
    font-size: 1.1vw;
    color:gray;
    height:5vw;
    button{
        font-size: 1.5vw;
        background-color:#D9FDFA90;
        border-radius:15vw;
        color: blue;
        border: none;
    }
    @media(max-width: 900px){
        font-size: 3vw;
        height:12vw;
        button{
            font-size: 3vw;
    }
    }  
`