import { ElasticScroll } from "./ElasticScroll";
import { HeroSection } from "./HeroSection";
import { PortfolioSection } from "./PortfolioSection";
import { StarFieldBackground } from "./scene/StarFieldBackground";

export function HomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#0b0b0a] text-[#e9e3c7]">
      <ElasticScroll />

      <div className="pointer-events-none fixed inset-0 z-0">
        <StarFieldBackground />
      </div>

      <HeroSection />
      <PortfolioSection />
    </main>
  );
}
