"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { ShoppingCart, LogOut, Search, X } from "lucide-react"
import RestaurantCard from "./restaurant-card"

interface LandingPageProps {
  onSelectRestaurant: (restaurant: any) => void
}

const categories = ["Pizzas", "Rolls", "Momos", "Noodles", "Cakes", "Burgers", "Shakes", "Biryani"]

const restaurants = [
  {
    id: 1,
    name: "Paneer Tikka",
    cuisine: "Punjabi, Home Food",
    location: "Raj Nagar",
    price: "Rs. 1000 for two",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
    items: [
      { id: 1, name: "Bruschetta", price: 450, discount: "Rs 1000 for two", veg: true },
      { id: 2, name: "Garlic Bread", price: 450, discount: "Rs 1000 for two", veg: true, tag: "Customise" },
      { id: 3, name: "Margherita Pizza", price: 450, discount: "Rs 1000 for two", veg: false, tag: "Spicy" },
      { id: 4, name: "Spaghetti Carbonara", price: 450, discount: "Rs 1000 for two", veg: false },
    ],
  },
  {
    id: 2,
    name: "Pizza Hut",
    cuisine: "Punjabi, Home Food",
    location: "Raj Nagar",
    price: "Rs. 1000 for two",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=400&h=300&fit=crop",
    items: [],
  },
  {
    id: 3,
    name: "Theobroma",
    cuisine: "Punjabi, Home Food",
    location: "Raj Nagar",
    price: "Rs. 1000 for two",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    items: [],
  },
  {
    id: 4,
    name: "Burger King",
    cuisine: "Punjabi, Home Food",
    location: "Raj Nagar",
    price: "Rs. 1000 for two",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    items: [],
  },
]

export default function LandingPage({ onSelectRestaurant }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">FoodWallah</h1>

            {/* Search, Location, Auth and Cart */}
            <div className="flex items-center gap-4">
              <button onClick={() => setShowSearch(true)} className="text-gray-600 hover:text-gray-900">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1">
                Ganganagar
                <span className="text-xs">▼</span>
              </button>
              {isLoggedIn && user ? (
                <>
                  <span className="text-sm font-medium text-gray-700">Hi, {user.firstName}</span>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-red-500 text-sm font-medium flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button className="text-gray-900 hover:text-orange-500 text-sm font-medium">SignIn</button>
              )}
              <ShoppingCart className="w-6 h-6 text-gray-900 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <div className="w-full h-48 md:h-64 lg:h-80 bg-gradient-to-r from-orange-50 to-orange-100 relative overflow-hidden">
        <img
          src="/delicious-food-collage-with-pizza-pasta-sushi-burg.jpg"
          alt="Delicious Food"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="border-b border-gray-200 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium whitespace-nowrap">Search For:</span>
              <input
                type="text"
                placeholder="your search query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-gray-600 placeholder:text-gray-400"
                autoFocus
              />
              <button className="text-gray-500 hover:text-gray-700">→</button>
              <button onClick={() => setShowSearch(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Search results area */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p className="text-gray-500 text-sm">Start typing to search restaurants, cuisines, or dishes...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <p className="text-xl text-gray-700 mb-8 text-left">Hey! What's on your mind</p>

          {/* Categories Scroll */}
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <span className="text-3xl">{getCategoryIcon(category)}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center gap-4 mb-6">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            Price Range
            <span className="text-xs">▼</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Restaurant Type
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Filters ✓
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Sort
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
              ←
            </button>
            <button className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
              →
            </button>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onSelectRestaurant(restaurant)}
            />
          ))}
        </div>

        {/* Loading Message */}
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Loading More Restaurants.....</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">FoodWallah</h3>
              <p className="text-sm text-gray-600">© 2025 Dine Order. All Rights Reserved</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Social</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-500">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function getCategoryIcon(category: string): string {
  const icons: { [key: string]: string } = {
    Pizzas: "🍕",
    Rolls: "🌯",
    Momos: "🥟",
    Noodles: "🍜",
    Cakes: "🎂",
    Burgers: "🍔",
    Shakes: "🥤",
    Biryani: "🍛",
  }
  return icons[category] || "🍽️"
}
