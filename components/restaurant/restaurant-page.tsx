"use client"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Share2, MapPin } from "lucide-react"
import MenuSection from "./menu-section"

interface RestaurantPageProps {
  restaurant: any
  onBack: () => void
  onViewCart: () => void
}

export default function RestaurantPage({ restaurant, onBack, onViewCart }: RestaurantPageProps) {
  const { cart, addToCart, getTotalItems } = useCart()

  const handleAddItem = (item: any) => {
    addToCart({ ...item, quantity: 1 }, restaurant.id, restaurant.name)
  }

  const foodFilters = ["Non-Veg", "Veg", "Egg", "Beverage", "Alcohol", "Spicy"]
  const cartCount = getTotalItems()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h1 className="text-lg font-bold text-gray-900 flex-1 text-center">{restaurant.name}</h1>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Get Direction
            </button>
            <button className="text-gray-600 hover:text-orange-500">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="rounded-2xl overflow-hidden h-64 md:h-80 bg-gray-200 mb-6">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Restaurant Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-gray-900 mb-2">{restaurant.name}</h1>
          <p className="text-gray-600 mb-1">{restaurant.cuisine}</p>
          <p className="text-gray-600 mb-4">{restaurant.location}</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-8 border-b border-gray-200">
          {foodFilters.map((filter, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${
                index === 1 ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Menu Sections */}
        {restaurant.items && restaurant.items.length > 0 && (
          <div className="space-y-8 mb-12">
            <MenuSection title="Appetizers" count={2} items={restaurant.items.slice(0, 2)} onAddItem={handleAddItem} />
            <MenuSection title="Main Course" count={2} items={restaurant.items.slice(2, 4)} onAddItem={handleAddItem} />
          </div>
        )}
      </div>

      {/* View Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={onViewCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-full font-bold text-lg shadow-lg"
          >
            View Cart ({cartCount})
          </Button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="w-12 h-12 bg-gray-300 rounded"></div>
            <div>
              <p className="font-semibold text-gray-900">License No. 12724060000693</p>
              <p className="font-bold text-gray-900">{restaurant.name}</p>
              <p>Address: 17, ganganagar, Rajasthan, 244001</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
