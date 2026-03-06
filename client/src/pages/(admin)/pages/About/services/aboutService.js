import { api } from '../../../services/authService'

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

export const updateAbout = async (data) => {
  try {
    const response = await api.put('/about', data)
    return response.data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Haqqımızda məlumatı yenilənərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}
