import React from 'react'
import { AdminAuthContext } from './adminAuthStore'

export const useAdminAuth = () => React.useContext(AdminAuthContext)

