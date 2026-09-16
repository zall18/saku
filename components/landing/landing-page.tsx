import { LandingNavbar } from "./landing-navbar";
import { HeroSection } from "./hero-section";
import { ProductPreview } from "./product-preview";
import { FeaturesBento } from "./features-bento";
import { HowItWorks } from "./how-it-works";
import { CtaBanner } from "./cta-banner";
import { LandingFooter } from "./landing-footer";

export function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <ProductPreview />
        <FeaturesBento />
        <HowItWorks />
        <CtaBanner />
      </main>
      <LandingFooter />
    </div>
  );
}
