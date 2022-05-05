import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  background-color: #e6e6e6;
  height: 30vw;
  align-items: center;
  @media (max-width: 900px) {
    height: 50vw;
  }
`

export const SlideContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #e6e6e6;
  margin: 0 auto;
  transition: 0.3s ease all;
  @media (max-width: 900px) {
    height: 50vw;
  }
`

export const BannerStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: #dedede;
  transition: 0.3s ease all;
  min-width: 100%;
  height: 80%;
  transition: 0.3s ease all;
  /* img {
    height: 100%;
    display: block;
    margin-top: center;
    margin-left: auto;
    margin-right: auto;
  } */
`
export const Title = styled.div`
  padding: 0 6vw;
  background-color: #e6e6e6;
  font-size: 1.1vw;
  color: gray;
  @media (max-width: 900px) {
    font-size: 3vw;
  }
`

export const ImageBox = styled.img`
  height: 100%;
  display: block;
  margin-top: center;
  margin-left: auto;
  margin-right: auto;
`
