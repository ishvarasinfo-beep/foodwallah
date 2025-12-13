"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import LoginPage from "@/components/auth/login-page"
import PhoneNumberPage from "@/components/auth/phone-number-page"
import OtpVerificationPage from "@/components/auth/otp-verification-page"
import LandingPage from "@/components/landing/landing-page"
import RestaurantPage from "@/components/restaurant/restaurant-page"
import CartPage from "@/components/checkout/cart-page"
import CheckoutPage from "@/components/checkout/checkout-page"
import ThankYouPage from "@/components/checkout/thank-you-page"
import TrackOrderPage from "@/components/checkout/track-order-page"

export default function Home() {
  const { login } = useAuth()
  const [authStep, setAuthStep] = useState<
    "login" | "phone" | "otp" | "landing" | "restaurant" | "cart" | "checkout" | "thank-you" | "track-order"
  >("login")
  const [userPhone, setUserPhone] = useState("")
  const [userName, setUserName] = useState({ firstName: "", lastName: "" })
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)

  const handlePhoneSubmit = (phone: string, firstName: string, lastName: string) => {
    setUserPhone(phone)
    setUserName({ firstName, lastName })
    setAuthStep("otp")
  }

  const handleOtpVerify = () => {
    login({
      id: Math.random().toString(),
      firstName: userName.firstName,
      lastName: userName.lastName,
      phone: userPhone,
      defaultAddress: "201, Ganga nagar, 344042",
    })
    setAuthStep("landing")
  }

  const handleSelectRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant)
    setAuthStep("restaurant")
  }

  const handleBackToLanding = () => {
    setAuthStep("landing")
  }

  const handleGoToCart = () => {
    setAuthStep("cart")
  }

  const handleGoToCheckout = () => {
    setAuthStep("checkout")
  }

  const handleGoToThankYou = () => {
    setAuthStep("thank-you")
  }

  const handleGoToTrackOrder = () => {
    setAuthStep("track-order")
  }

  return (
    <main>
      {authStep === "login" && <LoginPage onContinuePhone={() => setAuthStep("phone")} />}
      {authStep === "phone" && <PhoneNumberPage onSubmit={handlePhoneSubmit} />}
      {authStep === "otp" && <OtpVerificationPage phone={userPhone} onVerify={handleOtpVerify} />}
      {authStep === "landing" && <LandingPage onSelectRestaurant={handleSelectRestaurant} />}
      {authStep === "restaurant" && selectedRestaurant && (
        <RestaurantPage restaurant={selectedRestaurant} onBack={handleBackToLanding} onViewCart={handleGoToCart} />
      )}
      {authStep === "cart" && (
        <CartPage
          onCheckout={handleGoToCheckout}
          onBackToLanding={handleBackToLanding}
          onLogin={() => setAuthStep("login")}
        />
      )}
      {authStep === "checkout" && (
        <CheckoutPage
          onThankYou={handleGoToThankYou}
          onLogin={() => setAuthStep("login")}
          onBackToCart={handleGoToCart}
        />
      )}
      {authStep === "thank-you" && <ThankYouPage onContinue={handleGoToTrackOrder} />}
      {authStep === "track-order" && <TrackOrderPage onBack={handleBackToLanding} />}
    </main>
  )
}
