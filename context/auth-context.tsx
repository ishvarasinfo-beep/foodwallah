"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface User {
  id: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  defaultAddress?: string
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const login = (newUser: User) => {
    setUser(newUser)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  return <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
