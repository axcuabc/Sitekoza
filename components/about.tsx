import { ScrollAnimation } from "@/components/scroll-animations"
import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-black/95">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <ScrollAnimation animation="fadeInLeft">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 sm:mb-8">
                О <span className="text-golden">нас</span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInLeft" delay={200}>
              <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
                Мы создаём эксклюзивные изделия из кожи крокодила. Каждое изделие — уникально, ведь оно изготовлено
                вручную с любовью к деталям.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInLeft" delay={400}>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                Наша мастерская специализируется на создании премиальных кожаных изделий из экзотических видов кожи,
                которые сочетают в себе элегантность, функциональность и долговечность. Мы используем только натуральную
                кожу крокодила высшего качества и итальянскую фурнитуру.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInLeft" delay={600}>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                Каждый стежок, каждый срез и каждая деталь проходят через руки наших мастеров, чтобы создать изделие,
                которое будет радовать вас долгие годы и станет частью вашей истории. Мы гарантируем подлинность и
                качество каждого изделия.
              </p>
            </ScrollAnimation>
          </div>

          <div className="order-1 lg:order-2">
            <ScrollAnimation animation="fadeInRight" delay={300}>
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-xl shadow-golden/5">
                <Image
                  src="public\2 (2).webp"
                  alt="Мастер в фартуке сосредоточенно работает над сумкой из крокодиловой кожи в мастерской"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
