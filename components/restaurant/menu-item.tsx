"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface MenuItemProps {
  item: any
  onAddItem: (item: any) => void
}

export default function MenuItem({ item, onAddItem }: MenuItemProps) {
  const [quantity, setQuantity] = useState(0)

  const handleAdd = () => {
    setQuantity(1)
    onAddItem(item)
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
    onAddItem(item)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="flex justify-between items-start gap-4 pb-6 border-b border-gray-200">
      <div className="flex-1">
        <div className="flex items-start gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${item.veg ? "bg-green-500" : "bg-red-500"}`}></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {item.name}
              {item.tag && (
                <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">{item.tag}</span>
              )}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Serve 1, Grilled Bread with tomatoes, garlic basil and olive oil
            </p>
          </div>
        </div>

        <div className="mt-3">
          <p className="font-semibold text-gray-900">Rs. {item.price}</p>
          <p className="text-sm text-red-500">{item.discount}</p>
        </div>
      </div>

      {quantity === 0 ? (
        <Button
          onClick={handleAdd}
          className="bg-orange-200 hover:bg-orange-300 text-orange-600 font-semibold px-6 py-2 rounded-lg flex-shrink-0"
        >
          Add
        </Button>
      ) : (
        <div className="flex items-center gap-3 bg-orange-200 px-3 py-2 rounded-lg flex-shrink-0">
          <button
            onClick={handleDecrement}
            className="w-6 h-6 flex items-center justify-center text-orange-600 hover:text-orange-700 font-bold"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-orange-600 font-semibold w-8 text-center">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-6 h-6 flex items-center justify-center text-orange-600 hover:text-orange-700 font-bold"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
