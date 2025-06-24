"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  const targetScrollY = useRef(0)
  const currentScrollY = useRef(0)
  const isScrolling = useRef(false)
  const lastWheelTime = useRef(0)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Smooth scrolling parameters - еще более плавная и медленная прокрутка
    const smoothFactor = 0.1 // Уменьшено с 0.14 для более плавной интерполяции
    const wheelMultiplier = 1.2 // Уменьшено с 1.6 для более медленной реакции

    // Set initial scroll position
    currentScrollY.current = window.scrollY
    targetScrollY.current = window.scrollY

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()
      lastWheelTime.current = now

      // Calculate scroll delta with reduced speed for smoother feel
      let delta = e.deltaY * wheelMultiplier

      // Add gentle acceleration for faster scrolling when delta is large
      if (Math.abs(e.deltaY) > 50) {
        delta *= 1.1 // Уменьшено с 1.2 для более мягкого ускорения
      }

      // Update target scroll position
      targetScrollY.current += delta

      // Clamp to valid scroll range
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, maxScroll))

      // Start smooth scrolling if not already running
      if (!isScrolling.current) {
        isScrolling.current = true
        smoothScrollStep()
      }
    }

    const smoothScrollStep = () => {
      const now = Date.now()

      // Stop scrolling if no wheel events for 100ms (увеличено для более плавной остановки)
      if (now - lastWheelTime.current > 100) {
        // Sync current position with actual scroll position
        currentScrollY.current = window.scrollY
        targetScrollY.current = window.scrollY
        isScrolling.current = false
        return
      }

      // Calculate the difference between current and target
      const diff = targetScrollY.current - currentScrollY.current

      // If we're close enough, stop scrolling (увеличен порог для более плавной остановки)
      if (Math.abs(diff) < 0.3) {
        currentScrollY.current = targetScrollY.current
        window.scrollTo(0, currentScrollY.current)

        // Check again after a short delay
        setTimeout(() => {
          if (Date.now() - lastWheelTime.current > 100) {
            currentScrollY.current = window.scrollY
            targetScrollY.current = window.scrollY
            isScrolling.current = false
          }
        }, 40) // Увеличена задержка для более плавной остановки

        requestRef.current = requestAnimationFrame(smoothScrollStep)
        return
      }

      // Smooth interpolation with reduced dynamic acceleration for smoother feel
      const easedFactor = smoothFactor + (Math.abs(diff) / window.innerHeight) * 0.02 // Уменьшено с 0.03
      currentScrollY.current += diff * Math.min(easedFactor, 0.14) // Уменьшено с 0.18 для более плавного движения

      // Apply the scroll
      window.scrollTo(0, currentScrollY.current)

      // Continue the animation
      requestRef.current = requestAnimationFrame(smoothScrollStep)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle keyboard navigation with smooth scrolling
      let scrollAmount = 0

      switch (e.key) {
        case "ArrowDown":
          scrollAmount = 60 // Уменьшено с 80 для более плавной прокрутки клавишами
          break
        case "ArrowUp":
          scrollAmount = -60
          break
        case "PageDown":
          scrollAmount = window.innerHeight * 0.7 // Уменьшено с 0.8
          break
        case "PageUp":
          scrollAmount = -window.innerHeight * 0.7
          break
        case "Home":
          targetScrollY.current = 0
          currentScrollY.current = window.scrollY
          if (!isScrolling.current) {
            isScrolling.current = true
            lastWheelTime.current = Date.now()
            smoothScrollStep()
          }
          e.preventDefault()
          return
        case "End":
          targetScrollY.current = document.documentElement.scrollHeight - window.innerHeight
          currentScrollY.current = window.scrollY
          if (!isScrolling.current) {
            isScrolling.current = true
            lastWheelTime.current = Date.now()
            smoothScrollStep()
          }
          e.preventDefault()
          return
        case " ": // Spacebar
          scrollAmount = e.shiftKey ? -window.innerHeight * 0.7 : window.innerHeight * 0.7
          break
        default:
          return
      }

      if (scrollAmount !== 0) {
        e.preventDefault()
        lastWheelTime.current = Date.now()
        targetScrollY.current += scrollAmount

        // Clamp to valid scroll range
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, maxScroll))

        if (!isScrolling.current) {
          isScrolling.current = true
          smoothScrollStep()
        }
      }
    }

    const handleResize = () => {
      // Update scroll position on resize
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      targetScrollY.current = Math.min(targetScrollY.current, maxScroll)
      currentScrollY.current = Math.min(currentScrollY.current, maxScroll)
    }

    const handleTouchStart = () => {
      // Disable smooth scrolling during touch interactions
      isScrolling.current = false
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      // Sync positions
      currentScrollY.current = window.scrollY
      targetScrollY.current = window.scrollY
    }

    const handleTouchEnd = () => {
      // Re-sync scroll positions after touch
      currentScrollY.current = window.scrollY
      targetScrollY.current = window.scrollY
    }

    const handleScroll = () => {
      // If user scrolls manually (not through our smooth scroll), sync positions
      if (!isScrolling.current) {
        currentScrollY.current = window.scrollY
        targetScrollY.current = window.scrollY
      }
    }

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("scroll", handleScroll)

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return (
    <div ref={scrollContainerRef} className="smooth-scroll-container">
      {children}
    </div>
  )
}
