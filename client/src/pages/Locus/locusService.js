import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/public`,
  withCredentials: false
})

const normalizeList = (data) => {
  if (Array.isArray(data)) return data
  if (data?.data && Array.isArray(data.data)) return data.data
  if (data?.locus && Array.isArray(data.locus)) return data.locus
  if (data?.items && Array.isArray(data.items)) return data.items
  return []
}

const normalizeDetail = (data) => {
  if (!data) return null
  if (data.data) return data.data
  if (data.locus) return data.locus
  return data
}

export const fetchLocus = async ({ page = 1, limit = 1000, search } = {}) => {
  try {
    const response = await api.get('/locus', {
      params: {
        page,
        limit,
        ...(search ? { search } : {})
      }
    })
    return normalizeList(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Lokuslar yüklənərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchLocusById = async (id) => {
  try {
    const response = await api.get(`/locus/${id}`)
    return normalizeDetail(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Lokus məlumatı yüklənərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchVillages = async ({ page = 1, limit = 1000, search } = {}) => {
  try {
    const response = await api.get('/villages', {
      params: {
        page,
        limit,
        ...(search ? { search } : {})
      }
    })
    if (Array.isArray(response.data)) return response.data
    if (response.data?.data && Array.isArray(response.data.data)) return response.data.data
    if (response.data?.villages && Array.isArray(response.data.villages)) return response.data.villages
    if (response.data?.items && Array.isArray(response.data.items)) return response.data.items
    return []
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Kəndlər yüklənərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchVillageById = async (id) => {
  try {
    const response = await api.get(`/villages/${id}`)
    if (response.data?.data) return response.data.data
    if (response.data?.village) return response.data.village
    return response.data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Kənd məlumatı yüklənərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}
