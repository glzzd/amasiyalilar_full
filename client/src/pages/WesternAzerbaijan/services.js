import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/public`,
  withCredentials: false
})

const normalizeList = (data) => {
  if (Array.isArray(data)) return data
  if (data?.data && Array.isArray(data.data)) return data.data
  if (data?.items && Array.isArray(data.items)) return data.items
  return []
}

const normalizeDetail = (data) => {
  if (!data) return null
  if (data.data) return data.data
  return data
}

export const fetchRegions = async ({ page = 1, limit = 1000, search } = {}) => {
  try {
    const response = await api.get('/regions', {
      params: { page, limit, ...(search ? { search } : {}) }
    })
    if (response.data?.regions && Array.isArray(response.data.regions)) return response.data.regions
    return normalizeList(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Rayonlar yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchRegionById = async (id) => {
  try {
    const response = await api.get(`/regions/${id}`)
    if (response.data?.region) return response.data.region
    return normalizeDetail(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Rayon məlumatı yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchIntellectuals = async ({ page = 1, limit = 1000, search } = {}) => {
  try {
    const response = await api.get('/intellectuals', {
      params: { page, limit, ...(search ? { search } : {}) }
    })
    if (response.data?.intellectuals && Array.isArray(response.data.intellectuals))
      return response.data.intellectuals
    return normalizeList(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Ziyalılar yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchIntellectualById = async (id) => {
  try {
    const response = await api.get(`/intellectuals/${id}`)
    if (response.data?.intellectual) return response.data.intellectual
    return normalizeDetail(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Ziyalı məlumatı yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchOfficials = async ({ page = 1, limit = 1000, search } = {}) => {
  try {
    const response = await api.get('/officials', {
      params: { page, limit, ...(search ? { search } : {}) }
    })
    if (response.data?.officials && Array.isArray(response.data.officials))
      return response.data.officials
    return normalizeList(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Rəsmi şəxslər yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchOfficialById = async (id) => {
  try {
    const response = await api.get(`/officials/${id}`)
    if (response.data?.official) return response.data.official
    return normalizeDetail(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Rəsmi şəxs məlumatı yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchLibrary = async ({ page = 1, limit = 1000, search } = {}) => {
  try {
    const response = await api.get('/library', {
      params: { page, limit, ...(search ? { search } : {}) }
    })
    if (response.data?.books && Array.isArray(response.data.books)) return response.data.books
    if (response.data?.library && Array.isArray(response.data.library)) return response.data.library
    return normalizeList(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Kitablar yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchBookById = async (id) => {
  try {
    const response = await api.get(`/library/${id}`)
    if (response.data?.book) return response.data.book
    return normalizeDetail(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Kitab məlumatı yüklənərkən xəta baş verdi'
    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}
