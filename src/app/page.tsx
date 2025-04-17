"use client";
import { AnimatePresence } from "framer-motion";
import { Separator } from "../components/ui/separator";
import { useMounted } from "../hooks/use-mounted";
import { TerminalAnimation } from "../features/terminal/terminal-animation";
import { Header } from "../components/layout/header";
import { AnimatedSection } from "../components/animated-section";
import { HeroSection } from "../components/sections/hero-section";
import { AboutSection } from "../components/sections/about-section";
import { ProjectsSection } from "../components/sections/projects-section";
import { SkillsSection } from "../components/sections/skills-section";
import { ContactSection } from "../components/sections/contact-section";
import { PortfolioProvider, usePortfolio } from "../context/portfolio-context";

function PortfolioContent(): JSX.Element {
  const { showContent, setShowContent } = usePortfolio();
  const mounted = useMounted();

  if (!mounted) {
    return <></>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <AnimatePresence>
        {!showContent && (
          <TerminalAnimation onComplete={() => setShowContent(true)} />
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pt-24 pb-12 space-y-24">
        <AnimatedSection>
          <HeroSection />
        </AnimatedSection>

        {showContent && (
          <>
            <AnimatedSection>
              <AboutSection />
            </AnimatedSection>
            <AnimatedSection>
              <ProjectsSection />
            </AnimatedSection>
            <AnimatedSection>
              <SkillsSection />
            </AnimatedSection>
            <Separator className="my-12" />
            <AnimatedSection>
              <ContactSection />
            </AnimatedSection>
          </>
        )}
      </main>
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
