import axios from 'axios'
import { STORAGE_KEY } from '../contexts/adminAuthStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  withCredentials: true
})

// Request interceptor - token ekleme
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.accessToken) {
          const tokenType = parsed.tokenType || 'Bearer'
          config.headers.Authorization = `${tokenType} ${parsed.accessToken}`
        }
      } catch (e) {
        console.error('Token parsing error:', e)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - 401/403 hatası yakalama (Token expired)
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      // Token geçersiz, oturumu sonlandır
      localStorage.removeItem(STORAGE_KEY)
      // Login sayfasına yönlendir
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export const loginRequest = async (email, password, rememberMe = true) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
      rememberMe
    })

    return response.data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'Giriş zamanı xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const fetchCurrentUser = async (accessToken, tokenType = 'Bearer') => {
  try {
    const response = await api.get('/auth/me', {
      headers: {
        Authorization: `${tokenType} ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      'İstifadəçi məlumatları alınarkən xəta baş verdi'

    const err = new Error(message)
    err.status = error?.response?.status
    throw err
  }
}

export const logoutRequest = async () => {
  try {
    await api.post('/auth/logout')
  } catch {
    return null
  }
}
