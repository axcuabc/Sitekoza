"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeIn" | "scaleIn"
  delay?: number
  threshold?: number
}

export function ScrollAnimation({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay, threshold])

  const animationClasses = {
    fadeInUp: isVisible
      ? "opacity-100 translate-y-0 transition-all duration-1000 ease-out"
      : "opacity-0 translate-y-8 transition-all duration-1000 ease-out",
    fadeInLeft: isVisible
      ? "opacity-100 translate-x-0 transition-all duration-1000 ease-out"
      : "opacity-0 -translate-x-8 transition-all duration-1000 ease-out",
    fadeInRight: isVisible
      ? "opacity-100 translate-x-0 transition-all duration-1000 ease-out"
      : "opacity-0 translate-x-8 transition-all duration-1000 ease-out",
    fadeIn: isVisible
      ? "opacity-100 transition-opacity duration-1000 ease-out"
      : "opacity-0 transition-opacity duration-1000 ease-out",
    scaleIn: isVisible
      ? "opacity-100 scale-100 transition-all duration-1000 ease-out"
      : "opacity-0 scale-95 transition-all duration-1000 ease-out",
  }

  return (
    <div ref={elementRef} className={`${animationClasses[animation]} ${className}`}>
      {children}
    </div>
  )
}
