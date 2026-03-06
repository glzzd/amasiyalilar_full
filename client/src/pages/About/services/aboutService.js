import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`
})

export const getAbout = async () => {
  try {
    const response = await api.get('/about')
    return response.data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Haqqımızda məlumatı gətirilərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}
