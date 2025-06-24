import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { ScrollIndicator } from "@/components/scroll-indicator"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "OBSIDIAN HIDE - Премиальные кожаные изделия ручной работы",
  description:
    "Создаём уникальные кожаные изделия с душой. Натуральная кожа, итальянская фурнитура и тепло рук мастера.",
  keywords: "кожаные изделия, ручная работа, премиум, сумки, портфели, обувь",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <ScrollIndicator />
        {children}
      </body>
    </html>
  )
}
