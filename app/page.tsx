"use client"

import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ProductShowcase } from "@/components/product-showcase"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { CartModal } from "@/components/cart-modal"
import { OrderModal } from "@/components/order-modal"
import { Toaster } from "@/components/ui/toaster"
import { useCart } from "@/hooks/use-cart"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const {
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
  } = useCart()

  const handleCheckout = () => {
    closeCart()
    openOrderModal()
  }

  const handleOrderComplete = () => {
    clearCart()
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
        <Navigation
          cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          onCartOpen={openCart}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <Hero />
        <ProductShowcase onAddToCart={addToCart} searchQuery={searchQuery} />
        <About />
        <Contact />
        <Footer />
        <CartModal
          isOpen={isCartOpen}
          onClose={closeCart}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          cartSummary={calculateCartSummary()}
          onCheckout={handleCheckout}
        />
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={closeOrderModal}
          cartItems={cartItems}
          cartSummary={calculateCartSummary()}
          onOrderComplete={handleOrderComplete}
        />
        <Toaster />
      </div>
    </QueryClientProvider>
  )
}
