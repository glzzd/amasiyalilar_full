import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/public`,
  withCredentials: false
})

const normalizeList = (data) => {
  if (Array.isArray(data)) return data
  if (data?.data && Array.isArray(data.data)) return data.data
  if (data?.veterans && Array.isArray(data.veterans)) return data.veterans
  if (data?.items && Array.isArray(data.items)) return data.items
  return []
}

const normalizeDetail = (data) => {
  if (!data) return null
  if (data.data) return data.data
  if (data.veteran) return data.veteran
  return data
}

export const fetchVeterans = async ({ page = 1, limit = 1000, search } = {}) => {
  try {
    const response = await api.get('/veterans', {
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
      'Qazilər yüklənərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchVeteranById = async (id) => {
  try {
    const response = await api.get(`/veterans/${id}`)
    return normalizeDetail(response.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Qazi məlumatı yüklənərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}
