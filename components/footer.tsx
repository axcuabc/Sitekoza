import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <p className="text-gray-400 text-sm sm:text-base">© 2025, OBSIDIAN HIDE. Все права защищены.</p>
        </div>

        <div className="flex space-x-6 sm:space-x-8">
          <Link
            href="https://wa.me/79211078823"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden hover:text-white transition-colors p-2 touch-manipulation active:scale-95"
            aria-label="WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a3 3 0 0 0 3 3l3-3" />
            </svg>
          </Link>
          <Link
            href="https://t.me/79211078823"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden hover:text-white transition-colors p-2 touch-manipulation active:scale-95"
            aria-label="Telegram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  )
}
