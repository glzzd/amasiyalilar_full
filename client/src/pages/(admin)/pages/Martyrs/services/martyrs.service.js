import { api } from '../../../services/authService'

export const getAllMartyrs = async (params) => {
  try {
    const response = await api.get('/martyrs', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMartyrById = async (id) => {
  try {
    const response = await api.get(`/martyrs/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createMartyr = async (data) => {
  try {
    const response = await api.post('/martyrs', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateMartyr = async (id, data) => {
  try {
    const response = await api.put(`/martyrs/${id}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteMartyr = async (id) => {
  try {
    const response = await api.delete(`/martyrs/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
