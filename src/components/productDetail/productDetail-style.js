import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  background-color: #e6e6e6;
  height: 30vw;
  width: 40%;
  align-items: center;
  @media (max-width: 900px) {
    height: 50vw;
    width: 100%;
    padding: 0 0;
  }
`;

export const SlideContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #e6e6e6;
  margin: 0 auto;
  transition: 0.3s ease all;
  @media (max-width: 900px) {
    height: 50vw;
    padding: 0 0rem;
  }
`;

export const BannerStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: #dedede;
  transition: 0.3s ease all;
  min-width: 100%;
  height: 80%;
  transition: 0.3s ease all;
  img {
    height: 100%;
    display: block;
    margin-top: center;
    margin-left: auto;
    margin-right: auto;
  }
`;
export const Title = styled.div`
  padding: 0 6vw;
  background-color: #e6e6e6;
  font-size: 1.1vw;
  color: gray;
  margin: 0;
  @media (max-width: 900px) {
    font-size: 3vw;
  }
`;

export const ContainerBackground = styled.div`
  background-color: #e6e6e6;
  width: 60%;
  @media (max-width: 900px) {
    width: 100%;
    min-height: 120vw;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  min-height: 60vw;
  background-color: #e6e6e6;
  align-content: flex-end;
  margin-left: 5vw;
  margin-right: 5vw;
  @media (max-width: 900px) {
    display: inline;
    min-height: 200vw;
    margin: 0;
  }
`;
export const Line = styled.div`
  margin: auto 13px;
  border: 0.6px solid gray;
  opacity: 30%;
`;
export const MainTable = styled.div`
  @media (max-width: 900px) {
    min-height: 160vw;
  }
`;
