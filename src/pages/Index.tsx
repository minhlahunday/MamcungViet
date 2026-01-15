import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import OfferingsSection from "@/components/OfferingsSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <OfferingsSection />
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
