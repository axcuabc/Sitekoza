"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollAnimation } from "@/components/scroll-animations"
import { Phone, MapPin, MessageCircle, Send, AlertCircle } from "lucide-react"

export function Inquiry() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [showError, setShowError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
    // Скрываем ошибку при начале ввода
    if (showError) {
      setShowError(false)
    }
  }

  const validateForm = () => {
    const { name, phone, message } = formState
    return name.trim() && phone.trim() && message.trim()
  }

  const sendToWhatsApp = () => {
    if (!validateForm()) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    const { name, phone, message } = formState

    const whatsappMessage = `Здравствуйте! Меня зовут ${name}.

Мой телефон: ${phone}

Сообщение: ${message}

Отправлено с сайта OBSIDIAN HIDE`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/79211078823?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    // Очищаем форму после отправки
    setFormState({ name: "", phone: "", message: "" })
  }

  const sendToTelegram = () => {
    if (!validateForm()) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    const { name, phone, message } = formState

    const telegramMessage = `Здравствуйте! Меня зовут ${name}.

Мой телефон: ${phone}

Сообщение: ${message}

Отправлено с сайта OBSIDIAN HIDE`

    const encodedMessage = encodeURIComponent(telegramMessage)
    const telegramUrl = `https://t.me/+79211078823?text=${encodedMessage}`

    window.open(telegramUrl, "_blank")

    // Очищаем форму после отправки
    setFormState({ name: "", phone: "", message: "" })
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

  return (
    <section id="inquiry" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation animation="fadeInUp">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-4 sm:mb-6">
            Сделать <span className="text-golden">заказ</span>
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <p className="text-base sm:text-lg text-center text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Оставьте заявку, мы свяжемся с вами.
          </p>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Форма заказа - левая часть */}
          <ScrollAnimation animation="fadeInLeft" delay={400}>
            <div className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg border border-golden/10 w-full">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold mb-4 sm:mb-6 text-golden">
                Форма заказа
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300 block">
                    Имя
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 focus:border-golden focus:ring-golden/20 h-10 text-base touch-manipulation w-full"
                    placeholder="Ваше имя"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-300 block">
                    Телефон
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 focus:border-golden focus:ring-golden/20 h-10 text-base touch-manipulation w-full"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300 block">
                    Сообщение
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-gray-800 border-gray-700 focus:border-golden focus:ring-golden/20 text-base touch-manipulation resize-none w-full"
                    placeholder="Расскажите о желаемом изделии..."
                  />
                </div>

                {/* Ошибка валидации */}
                {showError && (
                  <div className="bg-red-900/20 border border-red-800/30 text-red-300 p-3 rounded-lg flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Пожалуйста, заполните все поля</span>
                  </div>
                )}

                {/* Кнопки отправки */}
                <div className="space-y-3 pt-2">
                  <Button
                    onClick={sendToWhatsApp}
                    className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium shadow-lg w-full touch-manipulation active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Отправить в WhatsApp
                  </Button>

                  <Button
                    onClick={sendToTelegram}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium shadow-lg w-full touch-manipulation active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Отправить в Telegram
                  </Button>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-2">или</p>
                    <Button
                      onClick={copyPhoneNumber}
                      variant="outline"
                      className="border-golden text-golden hover:bg-golden hover:text-black transition-all duration-300 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium w-full touch-manipulation active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      Скопировать номер телефона
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg mt-4">
                  <p className="text-gray-300 text-xs sm:text-sm text-center">
                    💡 Выберите удобный способ связи. Ваше сообщение будет отправлено напрямую в мессенджер.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Контактная информация - правая часть */}
          <ScrollAnimation animation="fadeInRight" delay={600}>
            <div className="space-y-6 w-full">
              {/* Дополнительная информация */}
              <div className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg border border-golden/10 w-full order-1 lg:order-2">
                <h3 className="text-base sm:text-lg font-serif font-bold mb-3 sm:mb-4 text-golden">Условия заказа</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                  <p>• 100% предоплата</p>
                  <p>• Доставка по всей России</p>
                  <p>• Минимальная сумма заказа: 3000 ₽</p>
                  <p>• Гарантия качества</p>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg border border-golden/10 w-full order-2 lg:order-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold mb-4 sm:mb-6 text-golden">
                  Контакты
                </h3>

                <div className="space-y-4">
                  {/* Адрес */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-golden mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm sm:text-base">Адрес мастерской</p>
                      <p className="text-gray-300 text-xs sm:text-sm break-words">
                        г. Санкт-Петербург, ул. Ленина, д. 15
                      </p>
                      <a
                        href="https://yandex.ru/maps/?text=59.9311,30.3609"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-golden hover:text-white transition-colors text-xs mt-1 inline-block"
                      >
                        Показать на карте
                      </a>
                    </div>
                  </div>

                  {/* Телефон */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-golden mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm sm:text-base">Телефон</p>
                      <a
                        href="tel:+79211078823"
                        className="text-golden hover:text-white transition-colors text-xs sm:text-sm break-all"
                      >
                        +7 921 107-88-23
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-golden mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm sm:text-base">WhatsApp</p>
                      <a
                        href="https://wa.me/79211078823"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-golden hover:text-white transition-colors text-xs sm:text-sm break-all"
                      >
                        +7 921 107-88-23
                      </a>
                    </div>
                  </div>

                  {/* Telegram */}
                  <div className="flex items-start gap-3">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 text-golden mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm sm:text-base">Telegram</p>
                      <a
                        href="https://t.me/+79211078823"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-golden hover:text-white transition-colors text-xs sm:text-sm break-all"
                      >
                        @obsidianhide
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
