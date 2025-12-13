"use client"

import { Button } from "@/components/ui/button"

interface LoginPageProps {
  onContinuePhone: () => void
}

export default function LoginPage({ onContinuePhone }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get your food in a flash</h1>

        <p className="text-xl text-gray-700 mb-12">Sign In To Get Started</p>

        <div className="space-y-4">
          <Button
            className="w-full md:w-96 h-14 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-full"
            onClick={() => {}}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <text x="2" y="18" fontSize="16" fill="white" fontWeight="bold">
                G
              </text>
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <Button
            variant="outline"
            className="w-full md:w-96 h-14 text-lg rounded-full border-2 border-gray-300 text-gray-900 bg-transparent"
            onClick={onContinuePhone}
          >
            Continue with Phone Number
          </Button>
        </div>

        <p className="text-sm text-gray-600 mt-12">
          By continuing, you agree to your Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
