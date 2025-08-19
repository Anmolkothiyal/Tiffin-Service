import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PopularMeals from "@/components/PopularMeals";
import ScrollToSection from "@/components/ScrollToSection";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollToSection />
      <Header />
      <HeroSection />
      {/* <FeaturedOffers /> */}
      <WhyChooseUs />
      <PopularMeals />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
