"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  description?: string
}

export interface Cart {
  items: CartItem[]
  restaurantId?: string
  restaurantName?: string
}

interface CartContextType {
  cart: Cart
  addToCart: (item: CartItem, restaurantId: string, restaurantName: string) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [] })

  const addToCart = (item: CartItem, restaurantId: string, restaurantName: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((i) => i.id === item.id)
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
        }
      }
      return {
        ...prevCart,
        items: [...prevCart.items, item],
        restaurantId,
        restaurantName,
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((i) => i.id !== itemId),
    }))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
    }))
  }

  const clearCart = () => {
    setCart({ items: [] })
  }

  const getTotalItems = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
