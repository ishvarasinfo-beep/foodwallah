"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"

interface CheckoutPageProps {
  onThankYou: () => void
  onLogin: () => void
  onBackToCart: () => void
}

export default function CheckoutPage({ onThankYou, onLogin, onBackToCart }: CheckoutPageProps) {
  const { cart, getTotalPrice } = useCart()
  const { isLoggedIn, user, updateUser } = useAuth()
  const [expandedSection, setExpandedSection] = useState<string>("account")
  const [noContactDelivery, setNoContactDelivery] = useState(false)
  const [suggestion, setSuggestion] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState(user?.defaultAddress || "")
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    zipCode: "",
  })

  const deliveryFee = 40
  const gstCharges = 10
  const discount = couponApplied ? 20 : 0
  const subtotal = getTotalPrice()
  const total = subtotal + deliveryFee + gstCharges - discount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = () => {
    if (isLoggedIn && deliveryAddress) {
      onThankYou()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
          {!isLoggedIn && (
            <button
              onClick={onLogin}
              className="rounded-full bg-orange-500 px-6 py-2 font-semibold text-white hover:bg-orange-600"
            >
              Sign in
            </button>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {isLoggedIn && (
          <button onClick={onBackToCart} className="mb-6 flex items-center gap-2 text-orange-500 hover:text-orange-600">
            <ArrowLeft size={20} />
            Back
          </button>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Checkout Steps */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {!isLoggedIn ? (
                // Non-logged-in view with login/signup
                <div className="rounded-lg border border-gray-200 bg-white">
                  <button
                    onClick={() => setExpandedSection(expandedSection === "account" ? "" : "account")}
                    className="flex w-full items-center justify-between p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-semibold">
                        1
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Account</h2>
                    </div>
                    {expandedSection === "account" ? (
                      <ChevronUp className="text-gray-600" />
                    ) : (
                      <ChevronDown className="text-gray-600" />
                    )}
                  </button>

                  {expandedSection === "account" && (
                    <div className="border-t border-gray-200 px-6 py-6">
                      <div className="mb-8 text-center">
                        <p className="mb-8 text-gray-700">Please log in or sign up to continue.</p>
                        <div className="flex gap-3 justify-center">
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
                    </div>
                  )}
                </div>
              ) : (
                // Logged-in view with account info
                <div className="rounded-lg border border-gray-200 bg-white">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-semibold">
                        ✓
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Account</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-900 font-semibold">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Address */}
              {isLoggedIn && (
                <div className="rounded-lg border border-gray-200 bg-white">
                  <button
                    onClick={() => setExpandedSection(expandedSection === "delivery" ? "" : "delivery")}
                    className="flex w-full items-center justify-between p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-semibold">
                        2
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Add a delivery address</h2>
                    </div>
                    {expandedSection === "delivery" ? (
                      <ChevronUp className="text-gray-600" />
                    ) : (
                      <ChevronDown className="text-gray-600" />
                    )}
                  </button>

                  {expandedSection === "delivery" && (
                    <div className="border-t border-gray-200 px-6 py-6">
                      <div className="text-center py-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Add New Address</h3>
                        <p className="text-gray-600 mb-6">Please add a new delivery address to proceed</p>
                        <button
                          onClick={() => setDeliveryAddress("201, Ganga nagar, 344042")}
                          className="rounded-full bg-orange-500 px-8 py-2 font-semibold text-white hover:bg-orange-600"
                        >
                          Add New
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: My Cart */}
              {isLoggedIn && (
                <div className="rounded-lg border border-gray-200 bg-white">
                  <button
                    onClick={() => setExpandedSection(expandedSection === "cart" ? "" : "cart")}
                    className="flex w-full items-center justify-between p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white font-semibold">
                        🛒
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">My Cart</h2>
                    </div>
                    {expandedSection === "cart" ? (
                      <ChevronUp className="text-gray-600" />
                    ) : (
                      <ChevronDown className="text-gray-600" />
                    )}
                  </button>

                  {expandedSection === "cart" && (
                    <div className="border-t border-gray-200 px-6 py-6">
                      <div className="space-y-4">
                        {cart.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900">Rs. {item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="sticky top-8 space-y-6">
              <div className="rounded-lg bg-white p-6">
                <h3 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h3>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Suggestion Box */}
                {isLoggedIn && (
                  <div className="mb-6">
                    <textarea
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      placeholder="Any suggestion?We will pass it on..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                )}

                {/* No Contact Delivery */}
                {isLoggedIn && (
                  <div className="mb-6 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="noContact"
                      checked={noContactDelivery}
                      onChange={(e) => setNoContactDelivery(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="noContact" className="text-sm text-gray-600">
                      Opt in for No-contact Delivery. Our delivery partner will leave your order at door
                    </label>
                  </div>
                )}

                {/* Apply Coupon */}
                {isLoggedIn && (
                  <button
                    onClick={() => setCouponApplied(!couponApplied)}
                    className="w-full mb-6 rounded-full border-2 border-orange-500 px-4 py-2 font-semibold text-orange-500 hover:bg-orange-50"
                  >
                    Apply Coupon
                  </button>
                )}

                {/* Bill Details */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <h4 className="font-semibold text-gray-900">Bill Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Item Total</span>
                      <span>Rs. {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>Rs. {deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GST & Other Charges</span>
                      <span>Rs. {gstCharges}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-orange-600">Discount</span>
                        <span className="text-orange-600">-Rs. {discount}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="font-semibold text-gray-900">To Pay</span>
                      <span className="text-lg font-bold text-gray-900">Rs. {total}</span>
                    </div>
                    {couponApplied && <p className="text-orange-600 text-sm">Saving of Rs.{discount}</p>}
                  </div>
                </div>
              </div>

              {isLoggedIn && (
                <button
                  onClick={handlePlaceOrder}
                  className="w-full rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
                >
                  Proceed To Pay
                </button>
              )}
              <p className="text-center text-sm text-gray-600">
                Please review your order and address detail before proceeding
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
