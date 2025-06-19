export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface OrderFormData {
  name: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
}
