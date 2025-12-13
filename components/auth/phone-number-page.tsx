"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PhoneNumberPageProps {
  onSubmit: (phone: string, firstName: string, lastName: string) => void
}

export default function PhoneNumberPage({ onSubmit }: PhoneNumberPageProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = () => {
    if (phone.trim() && firstName.trim() && lastName.trim()) {
      onSubmit(`+91${phone}`, firstName, lastName)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">Login or sign up</h1>

        <p className="text-center text-gray-600 mb-12">We'll send you one time password to your phone number</p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">First Name</label>
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 text-lg border-b-2 border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 text-lg border-b-2 border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mobile Number</h2>
            <div className="flex items-center gap-2 border-b-2 border-gray-300 pb-2">
              <span className="text-lg font-semibold text-gray-700">+91</span>
              <Input
                placeholder="9897865467"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                maxLength="10"
                className="flex-1 text-lg border-0 bg-transparent focus:ring-0 placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-full font-semibold disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!phone.trim() || !firstName.trim() || !lastName.trim()}
          >
            Send OTP
          </Button>
        </div>

        <p className="text-center text-gray-500 mt-6">This helps us keep your account secure</p>
      </div>
    </div>
  )
}
