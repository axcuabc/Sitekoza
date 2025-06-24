"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку когда прокрутили больше половины высоты экрана
      const scrollTop = window.scrollY
      const halfViewportHeight = window.innerHeight / 2

      setIsVisible(scrollTop > halfViewportHeight)
    }

    // Добавляем обработчик события прокрутки
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Вызываем обработчик сразу для установки начального состояния
    handleScroll()

    // Очистка при размонтировании
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    // Принудительно синхронизируем позиции для smooth scroll
    if (window.scrollY > 0) {
      // Отключаем smooth scroll временно
      const smoothScrollContainer = document.querySelector(".smooth-scroll-container")
      if (smoothScrollContainer) {
        // Временно отключаем обработчики событий
        const wheelHandler = (e: Event) => e.stopPropagation()
        smoothScrollContainer.addEventListener("wheel", wheelHandler, { capture: true })

        // Выполняем прокрутку
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })

        // Восстанавливаем обработчики через небольшую задержку
        setTimeout(() => {
          smoothScrollContainer.removeEventListener("wheel", wheelHandler, { capture: true })
        }, 1000)
      } else {
        // Fallback если smooth scroll не найден
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={scrollToTop}
        className={`w-12 h-12 rounded-full bg-golden hover:bg-golden/90 text-black shadow-lg shadow-golden/20 transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        size="icon"
        aria-label="Прокрутить вверх"
      >
        <ChevronUp className="w-6 h-6" />
      </Button>
    </div>
  )
}
