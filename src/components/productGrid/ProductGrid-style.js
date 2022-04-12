import styled from "styled-components";

export const ContainerBackground = styled.div`
  background-color: #e6e6e6;
`;

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(30vw, 30vw);
  background-color: #e6e6e6;
  justify-content: center;
  display: grid;
  row-gap: 4rem;
  column-gap: 0.1rem;
  @media (max-width: 900px) {
    width: 90%;
    grid-template-columns: repeat(2, 0.5fr);
    grid-auto-rows: minmax(80vw, 80vw);
    column-gap: 0rem;
    row-gap: 2rem;
  }
`;
export const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e6e6e6;
`;

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
  @media (max-width: 900px) {
    width: 90%;
  }
`;

export const Line = styled.div`
  margin: auto 13px;
  border: 0.6px solid gray;
  opacity: 30%;
`;

export const ProductText = styled.div`
  position: relative;
  height: 25%;
  padding: 3.5vw 1.5vw;

  @media (max-width: 900px) {
    padding: 4.5vw 4.5vw;
    height: 30%;
  }
`;
export const ProductName = styled.div`
  font-size: 1vw;
  color: gray;
  @media (max-width: 900px) {
    font-size: 2.7vw;
  }
`;

export const ProductPrice = styled.div`
  font-size: 1.8vw;
  @media (max-width: 900px) {
    font-size: 4vw;
  }
`;

export const ProductCategory = styled.div`
  position: absolute;
  top: 0;
  font-size: 0.7vw;
  color: gray;
  top: 0;
  @media (max-width: 900px) {
    font-size: 1.6vw;
  }
`;
export const ProductDetails = styled.div`
  padding: 1rem 0;
  font-size: 1vw;
  color: gray;
  @media (max-width: 900px) {
    font-size: 3vw;
  }
`;
export const ProducttoCart = styled.button`
  position: absolute;
  border-width: 0px;
  color: #6495ed;
  font-size: 1.2vw;
  display: flex;
  border-radius: 0.3rem;
  bottom: 0;
  margin: 0 auto;
  align-content: center;
  @media (max-width: 900px) {
    font-size: 3vw;
  }
`;

export const Title = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 0 6vw;
  background-color: #e6e6e6;
  font-size: 1.1vw;
  color: gray;
  height: 5vw;
  button {
    font-size: 1.5vw;
    background-color: #d9fdfa90;
    border-radius: 15vw;
    color: blue;
    border: none;
  }
  @media (max-width: 900px) {
    font-size: 3vw;
    height: 12vw;
    button {
      font-size: 3vw;
    }
  }
`;

export const ProductCard = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #e6e6e6;
`;
