import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";

export function ContactSection(): JSX.Element {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h3 className="text-3xl font-bold mb-8">Contato</h3>
      <div className="flex justify-center gap-4">
        <Button asChild size="lg" className="gap-2">
          <a
            href="https://github.com/victoranalista"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="w-5 h-5" />
            GitHub
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="gap-2">
          <a
            href="https://www.linkedin.com/in/victoranalista7/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="w-5 h-5" />
            LinkedIn
          </a>
        </Button>
      </div>
    </motion.section>
  );
}
