import {useState, useEffect, useContext} from 'react'
import {API_BASE_URL} from '../constants'
import {useLatestAPI} from './useLatestAPI'
import axios from 'axios'

export function useFeaturedBanners(encodes, languages, pageSizes, featureds) {
  const {ref: apiRef, isLoading: isApiMetadataLoading} = useLatestAPI()
  const pageSize = pageSizes
  const encoder = encodes
  const language = languages
  const featured = featureds
  const [featuredBanners, setFeaturedBanners] = useState(() => ({
    data: {},
    isLoading: true,
  }))
  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {}
    }
    const CancelToken = axios.CancelToken
    const cancelSource = CancelToken.source()

    async function getFeaturedBanners() {
      try {
        setFeaturedBanners({data: {}, isLoading: true})

        const {data, status} = await axios(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            encoder,
          )}${featured}&lang=${language}&pageSize=${pageSize}`,
          {
            cancelToken: cancelSource.token,
          },
        )
        const response = status !== 200 ? {} : data
        setFeaturedBanners({data: response, isLoading: false})
      } catch (err) {
        setFeaturedBanners({data: {}, isLoading: false})
      }
    }

    getFeaturedBanners()
  }, [apiRef, isApiMetadataLoading])
  return featuredBanners
}
