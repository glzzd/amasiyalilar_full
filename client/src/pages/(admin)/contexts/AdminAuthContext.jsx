import React from 'react'
import { loginRequest, fetchCurrentUser, logoutRequest } from '../services/authService'
import { AdminAuthContext, STORAGE_KEY } from './adminAuthStore'

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null)
  const [accessToken, setAccessToken] = React.useState(null)
  const [tokenType, setTokenType] = React.useState('Bearer')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const initializeFromStorage = async () => {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        setLoading(false)
        return
      }

      try {
        const parsed = JSON.parse(stored)
        if (!parsed || !parsed.email || !parsed.accessToken) {
          window.localStorage.removeItem(STORAGE_KEY)
          setLoading(false)
          return
        }

        const type = parsed.tokenType || 'Bearer'

        try {
          const meData = await fetchCurrentUser(parsed.accessToken, type)

          if (!meData?.success || !meData.user) {
            window.localStorage.removeItem(STORAGE_KEY)
            setLoading(false)
            return
          }

          const nextUser = {
            id: meData.user._id,
            email: meData.user.email,
            roles: meData.roles || [],
            permissions: meData.permissions || []
          }

          setUser(nextUser)
          setAccessToken(parsed.accessToken)
          setTokenType(type)
        } catch {
          window.localStorage.removeItem(STORAGE_KEY)
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      } finally {
        setLoading(false)
      }
    }

    initializeFromStorage()
  }, [])

  const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase()

    const authData = await loginRequest(normalizedEmail, password, true)

    const token = authData.accessToken
    const type = authData.tokenType || 'Bearer'

    if (!token) {
      throw new Error('Access token alınmadı')
    }

    const meData = await fetchCurrentUser(token, type)

    if (!meData?.success || !meData.user) {
      throw new Error(meData?.message || 'İstifadəçi məlumatları tapılmadı')
    }

    const nextUser = {
      id: meData.user._id,
      email: meData.user.email,
      roles: meData.roles || [],
      permissions: meData.permissions || []
    }

    setUser(nextUser)
    setAccessToken(token)
    setTokenType(type)

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        id: nextUser.id,
        email: nextUser.email,
        roles: nextUser.roles,
        permissions: nextUser.permissions,
        accessToken: token,
        tokenType: type
      })
    )

    return nextUser
  }

  const logout = async () => {
    await logoutRequest()
    setUser(null)
    setAccessToken(null)
    setTokenType('Bearer')
    window.localStorage.removeItem(STORAGE_KEY)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    accessToken,
    tokenType
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}
