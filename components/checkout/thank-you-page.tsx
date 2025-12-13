"use client"

import { CheckCircle, ShoppingCart } from "lucide-react"

interface ThankYouPageProps {
  onContinue: () => void
}

export default function ThankYouPage({ onContinue }: ThankYouPageProps) {
  const orderNumber = "FD9866G"
  const estimatedArrival = "25-30 Mins"
  const totalPaid = 490.3

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900">FoodWallah</h1>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left - Food Image */}
          <div className="flex items-center justify-center">
            <img src="/delicious-pizza-food.jpg" alt="Order food" className="h-96 w-96 rounded-2xl object-cover" />
          </div>

          {/* Right - Thank You Message */}
          <div className="flex flex-col justify-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>

            <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">Thank you for placing your order!</h1>

            <p className="mb-12 text-center text-lg text-gray-600">Your order has been confirmed.</p>

            {/* Order Details Box */}
            <div className="mb-8 rounded-2xl border-2 border-orange-500 bg-white p-8">
              <div className="mb-6 grid grid-cols-2 gap-8">
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-600">Estimated Arrival:</p>
                  <p className="text-xl font-bold text-gray-900">{estimatedArrival}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-600">Order Number:</p>
                  <p className="text-xl font-bold text-gray-900">#{orderNumber}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="mb-2 text-sm font-semibold text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">Rs. {totalPaid.toFixed(2)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={onContinue}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-bold text-white hover:bg-orange-600"
              >
                <ShoppingCart size={20} />
                Track My Order!
              </button>

              <button
                onClick={onContinue}
                className="w-full rounded-full bg-green-100 px-8 py-4 font-semibold text-green-700 hover:bg-green-200"
              >
                Get instant updates on whatsapp!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
