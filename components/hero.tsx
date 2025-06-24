"use client"

import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animations"
import Image from "next/image"

export function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById("products")
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/1 (2).webp"
          alt="Мастер в кожаных перчатках работает с изделием из крокодиловой кожи"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90" />
      </div>

      <div className="relative z-10 text-center px-12 sm:px-16 max-w-5xl mx-auto">
        <ScrollAnimation animation="fadeInUp" delay={300}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-4 sm:mb-6 leading-tight md:leading-tight">
            <span className="md:hidden text-3xl sm:text-4xl">
              Изделия из натуральной <span className="whitespace-nowrap">крокодиловой кожи</span>{" "}
              <span className="text-golden block">премиального качества</span>
            </span>
            <span className="hidden md:block">
              Изделия из натуральной крокодиловой кожи <span className="text-golden inline">премиального качества</span>
            </span>
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={600}>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 text-gray-200 max-w-4xl mx-auto font-light leading-relaxed px-2">
            Собственное производство и строгий контроль качества — гарантия безупречного внешнего вида и долговечности.
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={900}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0">
            <Button
              onClick={scrollToProducts}
              variant="outline"
              size="lg"
              className="border-golden text-golden hover:bg-golden hover:text-black transition-all duration-300 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium shadow-lg shadow-golden/10 touch-manipulation active:scale-95 w-full sm:w-auto"
            >
              НАШ КАТАЛОГ
            </Button>
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="bg-golden text-black hover:bg-golden/90 transition-all duration-300 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium shadow-lg shadow-golden/20 touch-manipulation active:scale-95 w-full sm:w-auto"
            >
              ПОДРОБНЕЕ
            </Button>
          </div>
        </ScrollAnimation>
      </div>

      <ScrollAnimation animation="fadeIn" delay={1200}>
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
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
            className="text-golden sm:w-6 sm:h-6"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </ScrollAnimation>
    </section>
  )
}
