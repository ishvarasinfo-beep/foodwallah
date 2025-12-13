"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface OtpVerificationPageProps {
  phone: string
  onVerify: () => void
}

export default function OtpVerificationPage({ phone, onVerify }: OtpVerificationPageProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      const nextInput = document.querySelector(`[data-index="${index + 1}"]`) as HTMLInputElement
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`[data-index="${index - 1}"]`) as HTMLInputElement
      prevInput?.focus()
    }
  }

  const handleVerify = () => {
    const otpCode = otp.join("")
    if (otpCode.length === 6) {
      onVerify()
    }
  }

  const maskedPhone = phone.slice(0, -4) + "XXXX"

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="text-left mb-12">
        <h2 className="text-lg text-gray-600 font-semibold">Feastify</h2>
      </div>

      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Verify Your Mobile Number</h1>

        <p className="text-lg text-gray-600 mb-12">Enter the 6 digit code sent to {maskedPhone}</p>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              data-index={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 md:w-14 md:h-14 border-2 border-gray-300 rounded text-center text-2xl font-bold focus:border-orange-500 focus:ring-0 focus:outline-none"
            />
          ))}
        </div>

        <p className="text-gray-600 mb-8">
          Resend OTP in {String(timeLeft).padStart(2, "0")}:{String(0).padStart(2, "0")}
        </p>

        <Button
          className="w-full md:w-96 h-14 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-full font-semibold mb-6"
          onClick={handleVerify}
        >
          Verify & Login
        </Button>

        <p className="text-center text-gray-600">
          Entered the wrong number? <button className="font-bold text-gray-900 hover:text-orange-500">Change it</button>
        </p>
      </div>
    </div>
  )
}
