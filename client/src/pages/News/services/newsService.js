import axios from 'axios'

const NEWS_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const newsApi = axios.create({
  baseURL: `${NEWS_API_BASE_URL}/api/public`,
  withCredentials: false
})

let cachedNews = null
let pendingRequest = null

const normalizeNewsResponse = (data) => {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.data)) return data.data
  if (data && Array.isArray(data.news)) return data.news
  return []
}

const normalizeNewsDetail = (data) => {
  if (!data) return null
  if (data.data) return data.data
  if (data.news) return data.news
  return data
}

export const fetchConfirmedNews = async () => {
  if (cachedNews) return cachedNews
  if (pendingRequest) return pendingRequest

  pendingRequest = newsApi
    .get('/news', { params: { isConfirmed: true } })
    .then((response) => {
      const normalized = normalizeNewsResponse(response.data)
      cachedNews = normalized
      pendingRequest = null
      return normalized
    })
    .catch((error) => {
      pendingRequest = null
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        'Xəbərlər yüklənərkən xəta baş verdi'
      const err = new Error(message)
      err.status = error?.response?.status
      throw err
    })

  return pendingRequest
}

export const fetchNewsById = async (id) => {
  try {
    const response = await newsApi.get(`/news/${id}`)
    return normalizeNewsDetail(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Xəbər yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchConfirmedNewsByAuthor = async (authorId) => {
  try {
    const response = await newsApi.get('/news', {
      params: { isConfirmed: true, authorId: encodeURIComponent(authorId) }
    })
    return normalizeNewsResponse(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Xəbərlər yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}
