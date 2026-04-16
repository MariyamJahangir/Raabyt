import { HeroSection } from "@/components/features/hero-section";
import { ChallengeSection } from "@/components/features/challenge-section";
import { PainPointsSection } from "@/components/features/pain-points-section";
import { StanceSection } from "@/components/features/stance-section";
import { SolutionIntroSection } from "@/components/features/solution-intro-section";
import { ProductsShowcase } from "@/components/features/products-showcase";
import { WhyRaabyt } from "@/components/features/why-raabyt";
import { StatsCounter } from "@/components/features/stats-counter";
import { Testimonials } from "@/components/features/testimonials";
import { CTABanner } from "@/components/features/cta-banner";
import { TrustSignals } from "@/components/features/trust-signals";

export default function Home() {
  return (
    <>
      <section id="hero" className="min-h-screen relative flex flex-col justify-center">
        <HeroSection />
      </section>
      <section id="challenge">
        <ChallengeSection />
      </section>
      <section id="pain-points">
        <PainPointsSection />
      </section>
      <section id="stance">
        <StanceSection />
      </section>
      <section id="solution-intro">
        <SolutionIntroSection />
      </section>
      <section id="products" className="min-h-screen relative flex flex-col justify-center">
        <ProductsShowcase />
      </section>
      <section id="why-raabyt" className="min-h-screen relative flex flex-col justify-center">
        <WhyRaabyt />
      </section>
      {/* <section id="stats" className="relative flex flex-col justify-center">
        <StatsCounter />
      </section> */}
      <section id="testimonials" className="min-h-screen relative flex flex-col justify-center">
        <Testimonials />
      </section>
      <section id="trust">
        <TrustSignals />
      </section>
      <section id="cta">
        <CTABanner />
      </section>
    </>
  );
}
