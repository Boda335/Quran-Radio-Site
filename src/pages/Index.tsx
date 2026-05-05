import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { LiveStats } from "@/components/sections/LiveStats";
import { CTA } from "@/components/sections/CTA";
import { SectionDivider } from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Features />
        <SectionDivider />
        <QuoteSection />
        <SectionDivider />
        <LiveStats />
        <SectionDivider />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
