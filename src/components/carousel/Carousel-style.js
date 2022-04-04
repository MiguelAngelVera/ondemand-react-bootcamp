import styled from "styled-components"

export const Container = styled.div`
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
export const Arrow = styled.button`
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
export const CardContainer = styled.div`
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
export const CardBackground = styled.div`
    background-color:#DEDEDE;
`
export const Card = styled.div`
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
export const CardText = styled.div`
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

export const Title = styled.div`
    padding: 0 6vw;
    background-color: #E6E6E6;
    font-size: 1.1vw;
    color:gray;
    @media(max-width: 900px)
        {font-size: 3vw;}  
`