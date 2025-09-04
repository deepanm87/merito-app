import Header from "@/components/common/header"
import Banner from "@/components/home/banner"
import WhyMerito from "@/components/home/why-merito"
import Pricing from "@/components/home/pricing"
import CTA from "@/components/home/cta"
import Footer from "@/components/common/footer"


export default function Home() {
  return (
    <main>
      <Header />
      <Banner />
      <WhyMerito />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}