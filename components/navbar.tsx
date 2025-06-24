"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronDown, X, Phone } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const catalogTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (mobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("click", handleClickOutside)
      document.body.style.overflow = "hidden" // Prevent background scroll
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  // Очистка таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      if (catalogTimeoutRef.current) {
        clearTimeout(catalogTimeoutRef.current)
      }
    }
  }, [])

  const scrollToSection = (sectionId: string, category?: string) => {
    setMobileMenuOpen(false)
    setCatalogOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })

      // Если передана категория и мы переходим к разделу products, устанавливаем активную категорию
      if (category && sectionId === "products") {
        // Используем setTimeout, чтобы дать время для прокрутки и рендеринга компонента
        setTimeout(() => {
          const categoryButtons = document.querySelectorAll("#products button")
          const targetButton = Array.from(categoryButtons).find((button) =>
            button.textContent?.toLowerCase().includes(category.toLowerCase()),
          )

          if (targetButton) {
            ;(targetButton as HTMLButtonElement).click()
          }
        }, 500)
      }
    }
  }

  const handleCatalogMouseEnter = () => {
    if (catalogTimeoutRef.current) {
      clearTimeout(catalogTimeoutRef.current)
    }
    setCatalogOpen(true)
  }

  const handleCatalogMouseLeave = () => {
    // Добавляем задержку перед закрытием меню
    catalogTimeoutRef.current = setTimeout(() => {
      setCatalogOpen(false)
    }, 300) // 300мс задержка перед закрытием
  }

  const copyPhoneNumber = async () => {
    const phoneNumber = "+79211078823"
    try {
      await navigator.clipboard.writeText(phoneNumber)
    } catch (err) {
      // Fallback для старых браузеров
      const textArea = document.createElement("textarea")
      textArea.value = phoneNumber
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
    }
  }

  const catalogCategories = [
    { name: "Куртки", section: "products", category: "куртки" },
    { name: "Сумки", section: "products", category: "сумки" },
    { name: "Ремни", section: "products", category: "ремни" },
    { name: "Кошельки", section: "products", category: "кошельки" },
  ]

  return (
    <nav
      className={cn(
        "absolute top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        "bg-black/30 backdrop-blur-md py-2 shadow-lg shadow-black/20",
      )}
    >
      <div className="container mx-auto px-10 sm:px-24 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity duration-300 touch-manipulation"
        >
          <Image
            src="/photo_2025-06-10_16-55-21-removebg-preview (1) (1).webp"
            alt="Obsidian Hide Logo"
            width={80}
            height={80}
            className="w-19 h-19 md:w-25 md:h-25"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-12 xl:space-x-14">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-white hover:text-golden transition-all duration-300 relative group py-2 touch-manipulation font-medium"
          >
            Главная
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-golden transition-all duration-500 group-hover:w-full"></span>
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="text-white hover:text-golden transition-all duration-300 relative group py-2 touch-manipulation font-medium"
          >
            О нас
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-golden transition-all duration-500 group-hover:w-full"></span>
          </button>

          {/* Catalog Dropdown */}
          <div className="relative" onMouseEnter={handleCatalogMouseEnter} onMouseLeave={handleCatalogMouseLeave}>
            <button
              onClick={() => scrollToSection("products")}
              className="text-white hover:text-golden transition-all duration-300 relative group py-2 touch-manipulation font-medium flex items-center gap-1"
            >
              Каталог
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", catalogOpen && "rotate-180")} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-golden transition-all duration-500 group-hover:w-full"></span>
            </button>

            {/* Dropdown Menu */}
            {catalogOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-golden/20 rounded-lg shadow-lg shadow-black/20 py-2"
                onMouseEnter={handleCatalogMouseEnter}
                onMouseLeave={handleCatalogMouseLeave}
              >
                {catalogCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => scrollToSection(category.section, category.category)}
                    className="w-full text-left px-4 py-2 text-white hover:text-golden hover:bg-golden/10 transition-all duration-300 font-medium"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => scrollToSection("reviews")}
            className="text-white hover:text-golden transition-all duration-300 relative group py-2 touch-manipulation font-medium"
          >
            Отзывы
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-golden transition-all duration-500 group-hover:w-full"></span>
          </button>

          <button
            onClick={() => scrollToSection("blog")}
            className="text-white hover:text-golden transition-all duration-300 relative group py-2 touch-manipulation font-medium"
          >
            Блог
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-golden transition-all duration-500 group-hover:w-full"></span>
          </button>

          <button
            onClick={() => scrollToSection("inquiry")}
            className="text-white hover:text-golden transition-all duration-300 relative group py-2 touch-manipulation font-medium"
          >
            Контакты
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-golden transition-all duration-500 group-hover:w-full"></span>
          </button>

          {/* Phone Number with Copy */}
          <div className="w-44 flex justify-end">
            <button
              onClick={copyPhoneNumber}
              className="flex items-center gap-2 text-golden hover:text-white transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-golden/10 touch-manipulation active:scale-95"
              title="Нажмите, чтобы скопировать номер"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+7 921 107-88-23</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2 touch-manipulation active:scale-95 transition-transform duration-200 mobile-menu-container"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={cn("w-6 h-6 transition-transform duration-300", mobileMenuOpen && "rotate-90")}
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-black/95 backdrop-blur-md z-40">
          <div className="flex flex-col h-full">
            {/* Logo at top */}
            <div className="flex justify-center pt-8 pb-4">
              <Image
                src="/photo_2025-06-10_16-55-21-removebg-preview (1) (1).webp"
                alt="Obsidian Hide Logo"
                width={60}
                height={60}
                className="w-15 h-15"
              />
            </div>

            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-golden transition-colors duration-300 p-2 touch-manipulation active:scale-95"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation links */}
            <div className="flex flex-col justify-center items-center flex-1 space-y-4 px-4">
              <div className="bg-black/95 w-full max-w-xs rounded-lg py-6 px-4 border border-golden/10">
                {[
                  { name: "Главная", section: "hero" },
                  { name: "О нас", section: "about" },
                  { name: "Каталог", section: "products" },
                  { name: "Отзывы", section: "reviews" },
                  { name: "Блог", section: "blog" },
                  { name: "Контакты", section: "inquiry" },
                ].map((item, index) => (
                  <button
                    key={item.section}
                    onClick={() => scrollToSection(item.section)}
                    className="text-white hover:text-golden transition-all duration-300 text-lg font-medium py-2 px-6 rounded-lg hover:bg-golden/10 touch-manipulation active:scale-95 w-full text-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.name}
                  </button>
                ))}

                {/* Phone Number in Mobile Menu with Copy */}
                <button
                  onClick={copyPhoneNumber}
                  className="flex items-center justify-center gap-2 text-golden hover:text-white transition-all duration-300 text-lg font-medium py-3 px-6 rounded-lg hover:bg-golden/10 touch-manipulation active:scale-95 w-full mt-4 border-t border-golden/20 pt-6"
                  title="Нажмите, чтобы скопировать номер"
                >
                  <Phone className="w-5 h-5" />
                  <span>+7 921 107-88-23</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
