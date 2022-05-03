import React, {useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as styles from './Carousel-style'
import {useFeaturedBanners} from '../../utils/hooks/useFeaturedBanners'

function CarouselBox({imgSource, imgName}) {
  return (
    <>
      <img src={imgSource} alt={imgName} title={imgName} />
      <styles.CardText>{imgName}</styles.CardText>
    </>
  )
}

export default function CarouselApi() {
  const encode = '[[at(document.type, "category")]]'
  const language = 'en-us'
  const pageSize = '30'

  const {data: carouselDataApi, isLoading: carouselIsLoading} =
    useFeaturedBanners(encode, language, pageSize)

  const history = useNavigate()

  const carouselslide = useRef(null)

  const Next = () => {
    if (carouselslide.current.children.length > 0) {
      const firstElement = carouselslide.current.children[0]

      carouselslide.current.style.transition = `350ms ease-in all`
      carouselslide.current.style.transform = `translateX(-100%)`
      const append = () => {
        carouselslide.current.style.transition = 'none'
        carouselslide.current.style.transform = `translateX(0)`
        carouselslide.current.appendChild(firstElement)
        carouselslide.current.removeEventListener('transitionend', append)
      }
      carouselslide.current.addEventListener('transitionend', append)
    }
  }

  const Prev = () => {
    if (carouselslide.current.children.length > 0) {
      const index = carouselslide.current.children.length - 1
      const lastElement = carouselslide.current.children[index]
      carouselslide.current.insertBefore(
        lastElement,
        carouselslide.current.firstChild,
      )
      carouselslide.current.style.transition = 'none'
      carouselslide.current.style.transform = `translateX(-100%)`
      setTimeout(() => {
        carouselslide.current.style.transition = '350ms ease-in all'
        carouselslide.current.style.transform = `translateX(0)`
      }, 30)
    }
  }

  const handleParams = (e, item) => {
    history(
      `/ondemand-react-bootcamp/products?category=${item.slugs[0].toLowerCase()}`,
    )
  }

  return (
    <>
      <styles.Title>Departments</styles.Title>
      {carouselIsLoading ? (
        <h2 style={{textAlign: 'center'}}>Loading...</h2>
      ) : null}
      <styles.Container>
        <styles.CardBackground>
          <styles.CardContainer ref={carouselslide}>
            {!carouselIsLoading
              ? carouselDataApi.results.map((item) => (
                  <styles.Card
                    key={item.id}
                    onClick={(e) => handleParams(e, item)}
                  >
                    <CarouselBox
                      imgSource={item.data.main_image.url}
                      imgName={item.data.main_image.alt}
                    />
                  </styles.Card>
                ))
              : null}
          </styles.CardContainer>
        </styles.CardBackground>
        <styles.Arrow change="prev" onClick={Prev}>
          {'<'}
        </styles.Arrow>
        <styles.Arrow change="next" onClick={Next}>
          {'>'}
        </styles.Arrow>
      </styles.Container>
    </>
  )
}

CarouselBox.propTypes = {
  imgSource: PropTypes.string.isRequired,
  imgName: PropTypes.string.isRequired,
}
