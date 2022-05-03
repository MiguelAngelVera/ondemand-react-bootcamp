import styled from 'styled-components'

export const Container = styled.div`
  overflow: hidden;
  background-color: #e6e6e6;
  width: 100%;
  display: flex;
  gap: 10px;
  height: auto;
  flex-wrap: nowrap;
  height: auto;
  border-top: 60px solid #e6e6e6;
  @media (max-width: 900px) {
    display: inline;
  }
`
export const NavBarContainer = styled.nav`
  margin-left: 8vw;
  background-color: #e6e6e6;
  border-radius: 10px;
  padding: 1rem 1rem;
  flex: 1;
  height: 100vh;
  @media (max-width: 900px) {
    border-radius: 0px;
    width: 100%;
    padding: 0 0;
    margin-left: 0;
    border: none;
    height: auto;
    gap: 0;
    width: 100%;
    height: auto;
    border-radius: 0;
    border: none;
    border-top: 20px solid #e6e6e6;
    z-index: 3;
    padding-top: 10vw;
  }
`

export const NavBarList = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
  }
`
export const NavBarCard = styled.div`
  h1 {
    font-size: 1.6vw;
    margin-bottom: 2.7vw;
    @media (max-width: 900px) {
      margin-bottom: 0px;
      align-items: center;
      font-size: 3vw;
      text-align: center;
    }
  }
  h2 {
    font-size: 1.1vw;
    @media (max-width: 900px) {
      text-align: center;
      font-size: 1.6vw;
    }
  }
  h3 {
    font-size: 1vw;
    color: gray;
    @media (max-width: 900px) {
      font-size: 3vw;
    }
  }
  li {
    margin: 0px;
    list-style: none;
    font-size: 0.8vw;
    color: gray;
  }
  ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    @media (max-width: 900px) {
      margin: 0 auto;
      align-items: center;
      gap: 3vw;
    }
  }
`

export const ProductContainer = styled.div`
  background-color: #e6e6e6;
  @media (max-width: 900px) {
    padding: 10vw 0;
  }
`
export const ProductCard = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #e6e6e6;
`

export const ProductImage = styled.div`
  background-color: white;
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
  border: 0.6px solid gray;
  opacity: 30%;
`

export const ProductText = styled.div`
  position: relative;
  height: 100%;
  padding: 3.5vw 1.5vw;

  @media (max-width: 900px) {
    padding: 4.5vw 4.5vw;
  }
`
export const ProductName = styled.div`
  font-size: 1vw;
  color: gray;
  @media (max-width: 900px) {
    font-size: 2.7vw;
  }
`

export const ProductPrice = styled.div`
  font-size: 1.8vw;
  @media (max-width: 900px) {
    font-size: 4vw;
  }
`

export const ProductCategory = styled.div`
  position: absolute;
  font-size: 0.7vw;
  color: gray;
  top: 0;
  @media (max-width: 900px) {
    font-size: 2vw;
  }
`

export const Paginate = styled.div`
  font-size: 1.8vw;
  background-color: #e6e6e6;
  height: 30vw;
  justify-content: center;
  display: flex;
  @media (max-width: 900px) {
    font-size: 4vw;
  }
`
export const Arrow = styled.button`
  border-radius: 0.3rem;
  background-color: #e6e6e6;
  color: #6495ed;
  border-width: 0px;
  padding: 3vw;
  font-size: 2vw;
  @media (max-width: 900px) {
    font-size: 4vw;
    width: 12vw;
    height: 12vw;
  }
`
export const Title = styled.div`
  margin-top: '0';
  @media (max-width: 900px) {
    margin-top: '15vw';
  }
`
