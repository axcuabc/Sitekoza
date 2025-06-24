"use client"

import { ScrollAnimation } from "@/components/scroll-animations"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Products() {
  const [activeCategory, setActiveCategory] = useState("все")
  const [showAll, setShowAll] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(8) // По умолчанию для lg экранов
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})

  // Определяем количество товаров для показа в зависимости от размера экрана
  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth
      if (width < 768) {
        // mobile: 2 колонки, 2 ряда = 4 товара
        setItemsToShow(4)
      } else if (width < 1024) {
        // md: 3 колонки, 2 ряда = 6 товаров
        setItemsToShow(6)
      } else {
        // lg: 4 колонки, 2 ряда = 8 товаров
        setItemsToShow(8)
      }
    }

    updateItemsToShow()
    window.addEventListener("resize", updateItemsToShow)

    return () => window.removeEventListener("resize", updateItemsToShow)
  }, [])

  // Сбрасываем showAll при смене категории
  useEffect(() => {
    setShowAll(false)
  }, [activeCategory])

  const products = [
    
      [
  {
    id: 1,
    description: "Черный ремень из кожи крокодила с золотой пряжкой премиального качества",
    images: [
      "/ChatGPT-Image-12-июн.-2025-г._-12_56_16_9.webp", // Фото с человеком
      "/ChatGPT-Image-9-июн.-2025-г._-23_52_04 (1) (1).webp", // Товар
    ],
    category: "ремни",
    price: "5 500 ₽",
  },
  {
    id: 2,
    description: "Элегантная зеленая сумка из кожи крокодила с золотой фурнитурой",
    images: [
      "/ChatGPT Image 12 июн. 2025 г., 12_56_08_1.webp",
      "/ChatGPT-Image-10-июн.-2025-г._-00_19_20 (1) (1).webp",
    ],
    category: "сумки",
    price: "6 800 ₽",
  },
  {
    id: 3,
    description: "Красная сумка из кожи крокодила с золотой фурнитурой в классическом стиле",
    images: [
      "/ChatGPT Image 12 июн. 2025 г., 11_52_51_1.webp",
      "/ChatGPT-Image-10-июн.-2025-г._-00_17_22 (1) (1).webp",
    ],
    category: "сумки",
    price: "6 500 ₽",
  },
  {
    id: 4,
    description: "Коричневый ремень из кожи крокодила с серебристой пряжкой",
    images: [
      "/ChatGPT Image 12 июн. 2025 г., 12_56_13_2.webp",
      "/ChatGPT-Image-9-июн.-2025-г._-23_52_46 (1) (1).webp",
    ],
    category: "ремни",
    price: "4 200 ₽",
  },
  {
    id: 5,
    description: "Черная куртка-косуха из кожи крокодила с серебристой фурнитурой",
    images: [
      "/ChatGPT Image 12 июн. 2025 г., 12_53_19_5 (1).webp",
      "/ChatGPT-Image-9-июн.-2025-г._-23_46_04 (1) (1).webp",
    ],
    category: "куртки",
    price: "7 000 ₽",
  },
  {
    id: 6,
    description: "Компактная коричневая сумка через плечо с крокодиловой текстурой",
    images: [
      "/ChatGPT-Image-12-июн.-2025-г._-12_56_24_10.webp",
      "/ChatGPT-Image-10-июн.-2025-г._-09_39_37 (1) (1).webp",
    ],
    category: "сумки",
    price: "5 800 ₽",
  },
  {
    id: 7,
    description: "Коричневая сумка через плечо с золотой фурнитурой и выраженной текстурой",
    images: [
      "/ChatGPT Image 12 июн. 2025 г., 12_56_38_6.webp",
      "/ChatGPT Image 10 июн. 2025 г., 09_27_34 (1) (1).webp",
    ],
    category: "сумки",
    price: "6 200 ₽",
  },
  {
    id: 8,
    description: "Коричневый кошелек на молнии с золотой фурнитурой и крокодиловой текстурой",
    images: [
      "/ChatGPT Image 12 июн. 2025 г., 11_59_08_2.webp",
      "/ChatGPT Image 10 июн. 2025 г., 09_17_31 (1) (1).webp",
    ],
    category: "кошельки",
    price: "3 500 ₽",
  },
  {
    id: 10,
    description: "Коричневая сумка-клатч из кожи крокодила с ручкой и выраженной текстурой",
    images: [
      "/ChatGPT-Image-12-июн.-2025-г._-12_56_47_14.webp",
      "/ChatGPT Image 10 июн. 2025 г., 09_20_52 (1) (1).webp",
    ],
    category: "сумки",
    price: "5 200 ₽",
  },
  {
    id: 11,
    description: "Черный кошелек из кожи крокодила с золотой застежкой премиального качества",
    images: [
      "/ChatGPT Image 12 июн. 2025 г., 11_59_25_3.webp",
      "/ChatGPT Image 10 июн. 2025 г., 09_15_41 (1) (1).webp",
    ],
    category: "кошельки",
    price: "4 800 ₽",
  },
  {
    id: 12,
    description: "Оранжевая сумка через плечо из кожи крокодила с золотой фурнитурой",
    images: [
      "/ChatGPT Image 12 июн. 2025 г., 12_56_30_5.webp",
      "/ChatGPT Image 10 июн. 2025 г., 09_29_38 (1) (1).webp",
    ],
    category: "сумки",
    price: "6 100 ₽",
  },
]


  const categories = [
    { id: "все", name: "Все изделия" },
    { id: "куртки", name: "Куртки" },
    { id: "сумки", name: "Сумки" },
    { id: "ремни", name: "Ремни" },
    { id: "кошельки", name: "Кошельки" },
  ]

  const filteredProducts =
    activeCategory === "все" ? products : products.filter((product) => product.category === activeCategory)

  // Определяем какие товары показывать
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, itemsToShow)
  const hasMoreProducts = filteredProducts.length > itemsToShow

  const handleShowMore = () => {
    setShowAll(true)
  }

  const handleShowLess = () => {
    setShowAll(false)
    // Прокручиваем к началу секции товаров
    const element = document.getElementById("products")
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  const handleImageChange = (productId: number, imageIndex: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: imageIndex,
    }))
  }

  const handleIndicatorHover = (productId: number, imageIndex: number) => {
    handleImageChange(productId, imageIndex)
  }

  // Добавим функцию для сброса изображения к первому при уходе мыши с товара
  const handleMouseLeave = (productId: number) => {
    // Возвращаем к первому изображению при уходе курсора
    handleImageChange(productId, 0)
  }

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation animation="fadeInUp">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-6 sm:mb-8">
            Наш <span className="text-golden">каталог</span>
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl text-gray-300 mb-2">Работаем с доставкой по всей России</p>
            <p className="text-base sm:text-lg text-gray-400">
              Минимальная стоимость заказа 3000 руб • 100% предоплата
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={400}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 touch-manipulation active:scale-95 ${
                  activeCategory === category.id
                    ? "bg-golden text-black shadow-lg shadow-golden/20"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white border border-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product, index) => (
            <ScrollAnimation
              key={product.id}
              animation="fadeInUp"
              delay={400 + index * 200}
              className="group cursor-pointer touch-manipulation"
            >
              <div
                className="relative mb-3 sm:mb-4 overflow-hidden rounded-lg shadow-lg"
                onMouseLeave={() => handleMouseLeave(product.id)}
              >
                <div className="relative">
                  <Image
                    src={product.images[currentImageIndex[product.id] || 0] || "/placeholder.svg"}
                    alt={product.description}
                    width={250}
                    height={300}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover object-[center_50%] transition-all duration-700 ease-in-out group-hover:scale-105 group-active:scale-95"
                  />
                </div>

                <div className="absolute bottom-2 right-2 bg-golden text-black px-2 py-1 rounded text-xs sm:text-sm font-bold">
                  {product.price}
                </div>

                {/* Full-width horizontal line indicators */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-2 left-2 right-2 flex">
                    {product.images.map((_, imageIndex) => (
                      <button
                        key={imageIndex}
                        onMouseEnter={() => handleIndicatorHover(product.id, imageIndex)}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleImageChange(product.id, imageIndex)
                        }}
                        className={`h-1.5 flex-1 transition-all duration-700 ease-in-out touch-manipulation rounded-full ${
                          imageIndex === 0 ? "mr-0.5" : "ml-0.5"
                        } ${
                          (currentImageIndex[product.id] || 0) === imageIndex
                            ? "bg-golden"
                            : "bg-white/40 hover:bg-white/70"
                        }`}
                        aria-label={`View image ${imageIndex + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-xs sm:text-sm px-1 line-clamp-2">{product.description}</p>
            </ScrollAnimation>
          ))}
        </div>

        {/* Кнопки "Смотреть далее" и "Свернуть" */}
        {hasMoreProducts && (
          <ScrollAnimation animation="fadeInUp" delay={600}>
            <div className="flex justify-center mt-8 sm:mt-12">
              {!showAll ? (
                <Button
                  onClick={handleShowMore}
                  variant="outline"
                  size="lg"
                  className="border-golden text-golden hover:bg-golden hover:text-black transition-all duration-300 px-6 sm:px-8 py-3 text-base font-medium shadow-lg shadow-golden/10 touch-manipulation active:scale-95"
                >
                  СМОТРЕТЬ ДАЛЕЕ
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
                    className="ml-2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Button>
              ) : (
                <Button
                  onClick={handleShowLess}
                  variant="outline"
                  size="lg"
                  className="border-golden text-golden hover:bg-golden hover:text-black transition-all duration-300 px-6 sm:px-8 py-3 text-base font-medium shadow-lg shadow-golden/10 touch-manipulation active:scale-95"
                >
                  СВЕРНУТЬ
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
                    className="ml-2"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </Button>
              )}
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  )
}
