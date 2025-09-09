import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Banner from "@/components/home/banner";
import CTA from "@/components/home/cta";
import Pricing from "@/components/home/pricing";
import WhyMerito from "@/components/home/why-merito";

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
  );
}
