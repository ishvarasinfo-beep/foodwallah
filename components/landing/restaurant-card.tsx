"use client"

interface RestaurantCardProps {
  restaurant: any
  onClick: () => void
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      <div className="relative mb-4 rounded-lg overflow-hidden h-48 bg-gray-200">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>

      <p className="text-sm text-gray-600 mb-1">{restaurant.cuisine}</p>

      <p className="text-sm text-gray-600 mb-3">{restaurant.location}</p>

      <p className="text-sm font-semibold text-gray-700">{restaurant.price}</p>
    </div>
  )
}
