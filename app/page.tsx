import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { About } from "@/components/about"
import { Reviews } from "@/components/reviews"
import { Blog } from "@/components/blog"
import { Inquiry } from "@/components/inquiry"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <SmoothScroll>
        <main className="min-h-screen bg-black text-white">
          <Navbar />
          <Hero />
          <Products />
          <About />
          <Reviews />
          <Blog />
          <Inquiry />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  )
}
