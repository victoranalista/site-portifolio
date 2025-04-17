import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useAnimationVariants } from "../../hooks/use-animation-variants";

export function AboutSection(): JSX.Element {
  useAnimationVariants();

  return (
    <section className="relative mb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-3xl -z-10"
      />
      <Card className="bg-background/60 backdrop-blur transform-gpu hover:scale-[1.02] transition-transform duration-300">
        <CardHeader>
          <CardTitle className="text-3xl">Sobre Mim</CardTitle>
        </CardHeader>
        <CardContent className="text-lg leading-relaxed space-y-4">
          <p>
            Desenvolvedor Fullstack com experiência em desenvolvimento de
            soluções complexas e escaláveis. Especializado em arquitetura limpa,
            princípios SOLID e desenvolvimento orientado a testes.
          </p>
          <p>
            Atualmente focado em criar soluções inovadoras para o setor
            cartorário, combinando tecnologias modernas com necessidades do
            negócio.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}