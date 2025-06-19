"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { apiRequest } from "@/lib/queryClient"
import type { CartItem, OrderFormData } from "@/lib/types"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  cartSummary: {
    subtotal: string
    tax: string
    total: string
    itemCount: number
  }
  onOrderComplete: () => void
}

export function OrderModal({ isOpen, onClose, cartItems, cartSummary, onOrderComplete }: OrderModalProps) {
  const [formData, setFormData] = useState<Omit<OrderFormData, "items" | "subtotal" | "tax" | "total">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    paymentMethod: "cash",
    notes: "",
  })

  const { toast } = useToast()

  const orderMutation = useMutation({
    mutationFn: async (orderData: OrderFormData) => {
      const response = await apiRequest("POST", "/api/orders", orderData)
      return response.json()
    },
    onSuccess: () => {
      toast({
        title: "Order placed successfully!",
        description: "We'll contact you soon to confirm your order details.",
      })
      onOrderComplete()
      onClose()
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        paymentMethod: "cash",
        notes: "",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const orderData: OrderFormData = {
      ...formData,
      items: JSON.stringify(cartItems),
      subtotal: cartSummary.subtotal,
      tax: cartSummary.tax,
      total:
