"use client"

import { Star } from "lucide-react"
import { useState, useRef, useEffect, type TouchEvent } from "react"
import { ScrollAnimation } from "@/components/scroll-animations"
import Image from "next/image"

export function Reviews() {
  const [currentReview, setCurrentReview] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  const reviews = [
    {
      id: 1,
      text: "Заказывал портфель из кожи крокодила для деловых встреч. Качество превзошло все ожидания! Кожа великолепная, швы идеальные, фурнитура премиального качества. Пользуюсь уже год — выглядит как новый.",
      author: "Михаил Петров",
      rating: 5,
    },
    {
      id: 2,
      text: "Кошелек «Аллигатор» стал моим любимым аксессуаром. Отличное качество кожи крокодила, продуманный дизайн и безупречное исполнение. Рекомендую всем, кто ценит эксклюзивные вещи.",
      author: "Елена Соколова",
      rating: 5,
    },
    {
      id: 3,
      text: "Заказывал ремень из кожи крокодила по индивидуальным меркам. Результат превзошел все ожидания. Идеальная посадка, роскошная кожа и фурнитура. Спасибо за профессионализм!",
      author: "Александр Иванов",
      rating: 5,
    },
  ]

  // Reset auto-scroll timer
  const resetAutoScrollTimer = () => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current)
    }

    if (autoScrollEnabled && window.innerWidth < 768) {
      autoScrollTimerRef.current = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length)
      }, 5000)
    }
  }

  // Auto-scroll for mobile
  useEffect(() => {
    resetAutoScrollTimer()

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }
    }
  }, [autoScrollEnabled, reviews.length])

  // Handle swipe start
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsSwiping(true)
    setAutoScrollEnabled(false) // Pause auto-scroll when user starts swiping
  }

  // Handle swipe move with smoother animation
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart || !carouselRef.current) return

    const currentTouch = e.targetTouches[0].clientX
    const diff = touchStart - currentTouch

    // Calculate how much to move the carousel during the swipe with smoother interpolation
    const moveX = -currentReview * 100 - (diff / carouselRef.current.offsetWidth) * 100

    // Apply the transform directly during the swipe for a responsive feel
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${moveX}%)`
      carouselRef.current.style.transition = "none"
    }

    setTouchEnd(currentTouch)
  }

  // Handle swipe end with smoother transition
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !carouselRef.current) return

    // Reset the transition for the snap effect with smoother easing
    if (carouselRef.current) {
      carouselRef.current.style.transition = "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    }

    const diff = touchStart - touchEnd
    const threshold = carouselRef.current.offsetWidth * 0.12 // Reduced threshold for easier swiping

    if (diff > threshold) {
      // Swiped left - go to next review
      setCurrentReview((prev) => Math.min(prev + 1, reviews.length - 1))
    } else if (diff < -threshold) {
      // Swiped right - go to previous review
      setCurrentReview((prev) => Math.max(prev - 1, 0))
    } else {
      // Not enough swipe distance - snap back with smooth animation
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(-${currentReview * 100}%)`
      }
    }

    // Reset touch values
    setTouchStart(null)
    setTouchEnd(null)
    setIsSwiping(false)

    // Re-enable auto-scroll after a delay
    setTimeout(() => {
      setAutoScrollEnabled(true)
      resetAutoScrollTimer()
    }, 3000)
  }

  // Update transform when currentReview changes with smoother transition
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentReview * 100}%)`
      carouselRef.current.style.transition = "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    }
  }, [currentReview])

  // Handle manual navigation with smoother transitions
  const goToReview = (index: number) => {
    setCurrentReview(index)
    setAutoScrollEnabled(false)

    // Re-enable auto-scroll after a delay
    setTimeout(() => {
      setAutoScrollEnabled(true)
      resetAutoScrollTimer()
    }, 3000)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentReview((prev) => Math.max(prev - 1, 0))
        setAutoScrollEnabled(false)
      } else if (e.key === "ArrowRight") {
        setCurrentReview((prev) => Math.min(prev + 1, reviews.length - 1))
        setAutoScrollEnabled(false)
      }

      // Re-enable auto-scroll after a delay
      setTimeout(() => {
        setAutoScrollEnabled(true)
        resetAutoScrollTimer()
      }, 3000)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [reviews.length])

  return (
    <section id="reviews" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-cover bg-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="public\3 (1).webp"
          alt="Интерьер кожевенной мастерской с готовыми изделиями и инструментами"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollAnimation animation="fadeInUp">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-12 sm:mb-16">
            <span className="text-golden">Отзывы</span> клиентов
          </h2>
        </ScrollAnimation>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <ScrollAnimation
              key={review.id}
              animation="fadeInUp"
              delay={200 + index * 200}
              className="bg-black/60 backdrop-blur-sm p-6 lg:p-8 rounded-lg border border-golden/10 shadow-lg shadow-golden/5 hover:border-golden/30 transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-golden text-golden" />
                ))}
              </div>
              <blockquote className="text-base lg:text-lg italic mb-6 text-gray-200 leading-relaxed">
                "{review.text}"
              </blockquote>
              <cite className="text-golden font-semibold block">— {review.author}</cite>
            </ScrollAnimation>
          ))}
        </div>

        {/* Mobile Carousel with Smoother Swipe */}
        <ScrollAnimation animation="fadeInUp" delay={200} className="md:hidden">
          <div className="relative overflow-hidden touch-pan-y">
            <div
              ref={carouselRef}
              className="flex w-full transition-transform duration-600 ease-out"
              style={{
                transform: `translateX(-${currentReview * 100}%)`,
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-golden/10 shadow-lg shadow-golden/5 mx-auto max-w-sm">
                    <div className="flex mb-4 justify-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-golden text-golden" />
                      ))}
                    </div>
                    <blockquote className="text-base italic mb-6 text-gray-200 leading-relaxed text-center">
                      "{review.text}"
                    </blockquote>
                    <cite className="text-golden font-semibold block text-center">— {review.author}</cite>
                  </div>
                </div>
              ))}
            </div>

            {/* Swipe Instructions */}
            <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-400 pb-2 animate-pulse">
              {isSwiping ? "" : "← Проведите для просмотра →"}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-500 touch-manipulation ${
                  index === currentReview ? "bg-golden w-6" : "bg-gray-600"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => goToReview(Math.max(currentReview - 1, 0))}
              disabled={currentReview === 0}
              className={`p-2 rounded-full bg-black/40 backdrop-blur-sm border border-golden/20 touch-manipulation active:scale-95 transition-all duration-300 ${
                currentReview === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-golden/20"
              }`}
              aria-label="Previous review"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-golden"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={() => goToReview(Math.min(currentReview + 1, reviews.length - 1))}
              disabled={currentReview === reviews.length - 1}
              className={`p-2 rounded-full bg-black/40 backdrop-blur-sm border border-golden/20 touch-manipulation active:scale-95 transition-all duration-300 ${
                currentReview === reviews.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-golden/20"
              }`}
              aria-label="Next review"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-golden"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
