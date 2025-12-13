"use client"

import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { CheckCircle, Truck, MapPin, X } from "lucide-react"

interface TrackOrderPageProps {
  onBack: () => void
}

interface OrderItem {
  id: string
  name: string
  description: string
  image: string
  quantity: number
  price: number
}

export default function TrackOrderPage({ onBack }: TrackOrderPageProps) {
  const { user } = useAuth()
  const { cart } = useCart()

  const orderNumber = "FD9866G"
  const subtotal = 450
  const shipping = 40
  const discount = 10
  const totalPrice = subtotal + shipping - discount

  const stages = [
    { name: "Processing", icon: CheckCircle, completed: true },
    { name: "Out for delivery", icon: Truck, completed: false },
    { name: "Delivered", icon: CheckCircle, completed: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">FoodWallah</h1>
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Order Status Timeline */}
        <div className="mb-12 rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Order Status</h2>

          <div className="flex items-center justify-between">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon
              return (
                <div key={index} className="flex flex-1 items-center">
                  {/* Stage Circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full ${
                        stage.completed ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    >
                      <StageIcon className={`h-8 w-8 ${stage.completed ? "text-white" : "text-gray-400"}`} />
                    </div>
                    <p
                      className={`mt-2 text-sm font-semibold ${stage.completed ? "text-orange-500" : "text-gray-400"}`}
                    >
                      {stage.name}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {index < stages.length - 1 && (
                    <div className={`mx-4 flex-1 h-1 ${stage.completed ? "bg-orange-500" : "bg-gray-200"}`}></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left - Items Ordered and Shipping Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Items Ordered */}
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">Items Ordered</h3>

              <div className="space-y-6">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-orange-500">●</span>
                        <span className="font-semibold text-gray-900">{item.quantity}</span>
                        <span className="text-orange-500">●</span>
                      </div>
                      <p className="w-16 text-right font-semibold text-gray-900">Rs. {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">Shipping Information</h3>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user?.defaultAddress || "Address not provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Payment Summary */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200 h-fit">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Payment Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-semibold text-gray-900">Rs. {subtotal}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="font-semibold text-gray-900">Rs. {shipping}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Discount</p>
                <p className="font-semibold text-gray-900">Rs. {discount}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-6">
                  <p className="text-lg font-semibold text-gray-900">To Pay</p>
                  <p className="text-lg font-bold text-gray-900">Rs. {totalPrice}</p>
                </div>
                <p className="text-sm text-gray-600">Payment method</p>
                <p className="font-semibold text-gray-900">Cash on delivery (COD)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
