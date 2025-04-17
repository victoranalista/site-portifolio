import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";
import { useAnimationVariants } from "../hooks/use-animation-variants";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: "fadeIn" | "slideIn" | "scaleIn";
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  variants = "fadeIn",
  delay = 0,
}: AnimatedSectionProps): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animationVariants = useAnimationVariants();
  const selectedVariant = animationVariants[variants];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={selectedVariant}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
