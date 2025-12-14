import type React from "react"
import type { Metadata } from "next"
import { Port_Lligat_Slab } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import "./globals.css"

const portLligatSlab = Port_Lligat_Slab({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-port-lligat-slab",
})

export const metadata: Metadata = {
  title: "FoodWallah - Get Your Food in a Flash",
  description: "Order food online from the best restaurants near you. Fast delivery guaranteed.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${portLligatSlab.variable} font-serif antialiased`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
