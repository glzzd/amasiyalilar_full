import { api } from '../pages/(admin)/services/authService'

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    // Backend returns relative path like /uploads/filename.ext
    // We need to prepend API URL if it's not a full URL
    // But usually frontend serves static files from backend if proxied or absolute URL
    
    // If backend returns /uploads/..., and we want to display it
    // We should probably construct the full URL if the backend doesn't return it
    
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const fullUrl = `${baseUrl}${response.data.url}`
    
    return fullUrl
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Fayl yüklənərkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}
