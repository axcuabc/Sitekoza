"use client"

import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", updateScrollProgress)
    updateScrollProgress() // Initial calculation

    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div
      className="scroll-indicator"
      style={{
        transform: `scaleX(${scrollProgress})`,
      }}
    />
  )
}
