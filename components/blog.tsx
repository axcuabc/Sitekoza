"use client"

import { ScrollAnimation } from "@/components/scroll-animations"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Blog() {
  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-black/98">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation animation="fadeInUp">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-6 sm:mb-8">
            <span className="text-golden">Блог</span> мастерской
          </h2>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <ScrollAnimation animation="fadeInLeft" delay={200}>
              <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
                В этом разделе вскоре появятся материалы о развитии нашей мастерской: от идеи до реализации изделий из
                натуральной кожи крокодила.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInLeft" delay={400}>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                Мы расскажем о ключевых этапах производства, особенностях используемых материалов, подходах к дизайну и
                качестве. Также здесь вы найдете новости компании, информацию о новых коллекциях и полезные советы по
                уходу за изделиями.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInLeft" delay={600}>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                Следите за обновлениями — раздел будет регулярно дополняться.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInLeft" delay={800}>
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-golden text-golden hover:bg-golden hover:text-black transition-all duration-300 px-6 sm:px-8 py-3 text-base font-medium shadow-lg shadow-golden/10 touch-manipulation active:scale-95"
                  disabled
                >
                  СКОРО ОТКРЫТИЕ
                </Button>
              </div>
            </ScrollAnimation>
          </div>

          <div className="order-1 lg:order-2">
            <ScrollAnimation animation="fadeInRight" delay={300}>
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-xl shadow-golden/5">
                <Image
                  src="/4 (1).webp"
                  alt="Инструменты и материалы для работы с кожей крокодила: ножницы, шило, нитки, молотки и кожаные изделия"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">Мастерство в каждой детали</h3>
                  <p className="text-gray-200 text-sm sm:text-base">Узнайте больше о процессе создания наших изделий</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
