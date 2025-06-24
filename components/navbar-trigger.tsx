"use client"

import { useEffect, useState } from "react"

export function NavbarTrigger() {
  const [showTrigger, setShowTrigger] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show trigger area when scrolled down significantly
      setShowTrigger(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = () => {
    // Trigger navbar visibility
    const navbar = document.querySelector("nav")
    if (navbar) {
      navbar.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }))
    }
  }

  if (!showTrigger) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 h-16 z-40 pointer-events-auto"
      onMouseEnter={handleMouseEnter}
      style={{ background: "transparent" }}
    />
  )
}
