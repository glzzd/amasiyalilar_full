import { api } from '../../../../services/authService'

export const getWesternAbout = async () => {
  try {
    const response = await api.get('/about-west-azerbaijan')
    return response.data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Qərbi Azərbaycan məlumatı gətirilərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const updateWesternAbout = async (data) => {
  try {
    const response = await api.put('/about-west-azerbaijan', data)
    return response.data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Qərbi Azərbaycan məlumatı yenilənərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}
