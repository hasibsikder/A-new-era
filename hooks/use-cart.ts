"use client"

import { useState, useEffect } from "react"
import type { CartItem } from "@/lib/types"

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const calculateCartSummary = () => {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const subtotal = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0)
    const tax = subtotal * 0.08 // 8% tax rate
    const total = subtotal + tax

    return {
      itemCount,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    }
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const openOrderModal = () => setIsOrderModalOpen(true)
  const closeOrderModal = () => setIsOrderModalOpen(false)

  return {
    cartItems,
    isCartOpen,
    isOrderModalOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateCartSummary,
    openCart,
    closeCart,
    openOrderModal,
    closeOrderModal,
  }
}
