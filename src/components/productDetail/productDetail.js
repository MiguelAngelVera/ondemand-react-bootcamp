/* eslint-disable no-unused-expressions */
import React, {useContext, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'
import ListContext from '../../states/ListContext'
import {useFeaturedBanners} from '../../utils/hooks/useFeaturedBanners'
import Space from '../Space'

import * as styles from './productDetail-style'
import Selector from './Selector'

function BannerBox({imgSource}) {
  return <img src={imgSource} alt={imgSource} title={imgSource} />
}

function InfoBox({
  itemName,
  itemPrice,
  itemSku,
  itemCategory,
  itemSpecs,
  itemDescription,
  itemData,
}) {
  return (
    <>
      <h1 aria-label="nameValue" style={{color: 'black', margin: 0}}>
        {itemName}
      </h1>
      <styles.Line />
      <styles.MainTable>
        <tbody>
          <tr>
            <td>
              <h5
                aria-label="priceLabel"
                style={{color: '#6495ed', marginTop: '5vw'}}
              >
                List Price:
              </h5>
            </td>
            <td>
              <h2
                aria-label="priceValue"
                style={{color: 'black', marginTop: '5vw'}}
              >
                ${itemPrice}
              </h2>
            </td>
          </tr>
          <Selector itemData={itemData} cart={false} />
          <tr>
            <td>
              <h5 aria-label="skuLabel" style={{margin: 1, marginTop: '5vw'}}>
                sku:
              </h5>
            </td>
            <td>
              <styles.Line />
              <h5 aria-label="skuValue" style={{margin: 1, marginTop: '5vw'}}>
                {itemSku}
              </h5>
            </td>
          </tr>
          <tr>
            <td>
              <h5 aria-label="categoryLabel" style={{margin: 1}}>
                Category:
              </h5>
            </td>
            <td>
              <h5 aria-label="categoryValue" style={{margin: 1}}>
                {itemCategory.replace('--', ' & ').toUpperCase()}
              </h5>
            </td>
          </tr>
          <tr>
            <td>
              <h5 aria-label="descriptionLabel" style={{margin: 1}}>
                Description:
              </h5>
            </td>
            <td>
              <p style={{margin: 1, textAlign: 'justify', width: '90%'}}>
                {itemDescription}
              </p>
              <styles.Line />
            </td>
          </tr>
          <tr>
            <td style={{verticalAlign: 'top'}}>
              <h5 aria-label="specsLabel" style={{margin: 1}}>
                Things you must know:
              </h5>
            </td>

            <td style={{verticalAlign: 'top'}}>
              {itemSpecs.map((item) => (
                <h5
                  aria-label="specsValue"
                  key={item.spec_name}
                  style={{margin: 10, marginTop: 0}}
                >
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

export default function ProductDetail() {
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
                    <BannerBox imgSource={item.image.url} />
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
            {!productisLoading && productDataApi.results[0] !== undefined ? (
              <InfoBox
                itemName={productDataApi.results[0].data.name}
                itemPrice={productDataApi.results[0].data.price}
                itemSku={productDataApi.results[0].data.sku}
                itemCategory={productDataApi.results[0].data.category.slug}
                itemSpecs={productDataApi.results[0].data.specs}
                itemDescription={
                  productDataApi.results[0].data.description[0].text
                }
                itemData={productDataApi.results[0]}
              />
            ) : null}
          </styles.Title>
        </styles.ContainerBackground>
      </styles.Wrapper>
    </>
  )
}

BannerBox.propTypes = {
  imgSource: PropTypes.string.isRequired,
}

InfoBox.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
  itemSku: PropTypes.string.isRequired,
  itemCategory: PropTypes.string.isRequired,
  itemSpecs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  itemDescription: PropTypes.string.isRequired,
  itemData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
}
