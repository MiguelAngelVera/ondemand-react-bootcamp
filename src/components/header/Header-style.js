import styled from "styled-components";

export const MainHeader = styled.div`
  background-color: #f7dc6f;
  position: fixed;
  top: 0;
  width: 100%;
`;

export const BarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  @media (max-width: 900px) {
    padding: 0px 5px;
    height: 60px;
  }
`;

export const Left = styled.div`
  align-items: center;
  display: flex;
  flex: 5;
  justify-content: flex-end;
  margin-right: 3%;
  @media (max-width: 900px) {
    margin-right: 2vw;
  }
`;
export const ShopName = styled.div`
  padding: 0% 2%;
  text-align: center;
  font-size: 1.5vw;
  font-weight: bold;
  @media (max-width: 900px) {
    font-size: 3.3vw;
  }
`;

export const Mid = styled.div`
  align-items: center;
  flex: 3;
  background-color: white;
  @media (max-width: 900px) {
    flex: 9;
  }
`;
export const SearchBar = styled.div`
  border: 10% solid gray;
  display: flex;
  padding: 2.5%;
  justify-content: flex-end;
`;
export const SearchInput = styled.input`
  border: none;
  margin-right: 10%;
  background-color: white;
  width: 100%;
`;

export const Right = styled.div`
  flex: 10;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 3%;
  @media (max-width: 900px) {
    flex: 5;
  }
`;
export const SignBlock = styled.div`
  margin-right: 10%;
`;

export const Sign = styled.div`
  @media (max-width: 900px) {
    font-size: 2.5vw;
    margin-right: 10%;
  }
`;
