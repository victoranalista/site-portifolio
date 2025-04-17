import { motion } from "framer-motion";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { useScroll, useTransform } from "framer-motion";

export function HeroSection(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-12 mb-24 w-full px-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, duration: 1 }}
        className="relative group"
      >
        <Avatar className="w-48 h-48 md:w-64 md:h-64 ring-4 ring-emerald-500/20 transition-all duration-500">
          <AvatarImage
            src="https://github.com/victoranalista.png"
            className="transition-all duration-500 filter group-hover:grayscale"
            alt="Victor"
          />
          <AvatarFallback>VA</AvatarFallback>
        </Avatar>
      </motion.div>
      <div className="text-center md:text-left max-w-full md:max-w-2xl overflow-hidden">
        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text break-words">
            Desenvolvedor Fullstack
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8">
            Cartório Colorado (Brasília - DF)
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-sm md:text-base"
            >
              <a
                href="https://github.com/victoranalista"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="w-4 h-4 md:w-5 md:h-5" />
                GitHub
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 text-sm md:text-base"
            >
              <a
                href="https://www.linkedin.com/in/victoranalista7/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon className="w-4 h-4 md:w-5 md:h-5" />
                LinkedIn
              </a>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 text-sm md:text-base"
            >
              Download CV
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
