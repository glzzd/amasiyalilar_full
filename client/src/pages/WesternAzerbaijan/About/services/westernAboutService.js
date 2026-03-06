import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getWesternAbout = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/about-west-azerbaijan`)
    return response.data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Məlumatlar gətirilərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}
