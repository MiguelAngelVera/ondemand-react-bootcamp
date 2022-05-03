/* eslint-disable no-unused-expressions */
import React, {useContext, useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import ListContext from '../../states/ListContext'
import {useFeaturedBanners} from '../../utils/hooks/useFeaturedBanners'
import AddToCart from '../cart/AddToCart'
import Space from '../Space'

import * as styles from './productDetail-style'
import Selector from './Selector'

export default function ProductDetail() {
  const [qty, setQty] = useState(1)

  const slideref = useRef(null)

  const Slider = () => {
    if (slideref.current.children.length > 1) {
      const firstElement = slideref.current.children[0]
      slideref.current.style.transition = `700ms ease-in all`
      slideref.current.style.transform = `translateX(-100%)`
      const append = () => {
        slideref.current.style.transition = 'none'
        slideref.current.style.transform = `translateX(0)`
        slideref.current.appendChild(firstElement)
        slideref.current.removeEventListener('transitionend', append)
      }
      slideref.current.addEventListener('transitionend', append)
    }
  }

  useEffect(() => {
    const autoChange = setInterval(() => {
      Slider()
    }, 2500)
    return () => clearInterval(autoChange)
  }, [])

  function BannerBox(item) {
    const {image} = item
    return <img src={image.url} alt={image.alt} title={image.alt} />
  }

  function InfoBox(data) {
    return (
      <>
        <h1 style={{color: 'black', margin: 0}}>{data.data.data.name}</h1>
        <styles.Line />
        <styles.MainTable>
          <tbody>
            <tr>
              <td>
                <h5 style={{color: '#6495ed', marginTop: '5vw'}}>
                  List Price:
                </h5>
              </td>
              <td>
                <h2 style={{color: 'black', marginTop: '5vw'}}>
                  ${data.data.data.price}
                </h2>
              </td>
            </tr>
            <Selector {...data} cart={false} />
            {/* <tr>
              <td></td>
              <td style={{ display: "flex" }}>
                <h5 style={{ margin: 0 }}>qty: </h5>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <AddToCart data={data.data} qty={qty}></AddToCart>
              </td>
            </tr> */}
            <tr>
              <td>
                <h5 style={{margin: 1, marginTop: '5vw'}}>sku:</h5>
              </td>
              <td>
                <styles.Line />
                <h5 style={{margin: 1, marginTop: '5vw'}}>
                  {data.data.data.sku}
                </h5>
              </td>
            </tr>
            <tr>
              <td>
                <h5 style={{margin: 1}}>Category:</h5>
              </td>
              <td>
                <h5 style={{margin: 1}}>
                  {data.data.data.category.slug
                    .replace('--', ' & ')
                    .toUpperCase()}
                </h5>
              </td>
            </tr>
            <tr>
              <td>
                <h5 style={{margin: 1}}>Description:</h5>
              </td>
              <td>
                <p style={{margin: 1, textAlign: 'justify', width: '90%'}}>
                  {data.data.data.description[0].text}
                </p>
                <styles.Line />
              </td>
            </tr>
            <tr>
              <td style={{verticalAlign: 'top'}}>
                <h5 style={{margin: 1}}>Things you must know:</h5>
              </td>

              <td style={{verticalAlign: 'top'}}>
                {data.data.data.specs.map((item) => (
                  <h5 key={item.spec_name} style={{margin: 10, marginTop: 0}}>
                    {item.spec_name}: {item.spec_value}
                  </h5>
                ))}
              </td>
            </tr>
          </tbody>
        </styles.MainTable>
      </>
    )
  }

  const {id} = useParams('')

  const {
    productEncode,
    productLanguage,
    productPageSize,
    setProductEncode,
    setProductPageSize,
    setProductLanguage,
  } = useContext(ListContext)

  useEffect(() => {
    setProductEncode(`[[:d=at(document.id , "${id}")]]`)
    setProductPageSize(100)
    setProductLanguage('en-us')
  }, [])

  const {data: productDataApi, isLoading: productisLoading} =
    useFeaturedBanners(productEncode, productLanguage, productPageSize, '')

  return (
    <>
      <Space />
      <styles.Wrapper>
        <styles.Container>
          <styles.SlideContainer ref={slideref}>
            {!productisLoading ? (
              Object.values(
                productDataApi.results[0].data.images.map((item) => (
                  <styles.BannerStyle key={item.image.url}>
                    <BannerBox {...item} />
                  </styles.BannerStyle>
                )),
              )
            ) : (
              <styles.BannerStyle>
                <h2>Loading..</h2>
              </styles.BannerStyle>
            )}
          </styles.SlideContainer>
        </styles.Container>
        <styles.ContainerBackground>
          <styles.Title>
            {!productisLoading ? (
              <InfoBox data={productDataApi.results[0]} />
            ) : null}
          </styles.Title>
        </styles.ContainerBackground>
      </styles.Wrapper>
    </>
  )
}
