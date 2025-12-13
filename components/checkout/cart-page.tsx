"use client"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartPageProps {
  onCheckout: () => void
  onBackToLanding: () => void
  onLogin: () => void
}

export default function CartPage({ onCheckout, onBackToLanding, onLogin }: CartPageProps) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const { isLoggedIn, user } = useAuth()

  const deliveryFee = 40
  const gstCharges = 10
  const subtotal = getTotalPrice()
  const total = subtotal + deliveryFee + gstCharges

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <button onClick={onBackToLanding} className="hover:text-orange-500">
            Home
          </button>{" "}
          / {cart.restaurantName} / My Cart
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Your Order ({cart.items.length} items)</h2>
                {cart.items.length > 0 && (
                  <button className="text-sm font-semibold text-orange-500 hover:text-orange-600">Clear All</button>
                )}
              </div>

              {cart.items.length === 0 ? (
                <p className="py-8 text-center text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex gap-6">
                        {item.image && (
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex flex-1 items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="rounded border border-orange-500 p-1 text-orange-500 hover:bg-orange-50"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="rounded border border-orange-500 p-1 text-orange-500 hover:bg-orange-50"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <div className="min-w-16 text-right font-semibold text-gray-900">
                              Rs. {item.price * item.quantity}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="sticky top-8 space-y-6">
              {/* Order Summary */}
              <div className="rounded-lg bg-white p-6">
                <h3 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item Total</span>
                    <span className="font-semibold text-gray-900">Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-gray-900">Rs. {deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST & Other Charges</span>
                    <span className="font-semibold text-gray-900">Rs. {gstCharges}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">To Pay</span>
                      <span className="text-lg font-bold text-gray-900">Rs. {total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {isLoggedIn && user ? (
                <div className="rounded-lg border-2 border-orange-500 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Hello, {user.firstName}</p>
                        <p className="text-sm text-gray-600">You are logged in</p>
                      </div>
                    </div>
                    <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm">Edit</button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6 text-center">
                  <p className="mb-4 text-gray-600">Your cart will be saved for you</p>
                  <div className="flex gap-3">
                    <button
                      onClick={onLogin}
                      className="flex-1 rounded-full border-2 border-orange-500 px-4 py-2 font-semibold text-orange-500 hover:bg-orange-50"
                    >
                      Log In
                    </button>
                    <button
                      onClick={onLogin}
                      className="flex-1 rounded-full bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
