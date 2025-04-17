import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { FEATURED_PROJECTS } from "../../constants/portfolio-data";
import { useAnimationVariants } from "../../hooks/use-animation-variants";

export function ProjectsSection(): JSX.Element {
  const { slideIn } = useAnimationVariants();

  return (
    <section className="mb-24">
      <motion.div variants={slideIn}>
        <h3 className="text-3xl font-bold mb-8">Projetos em Destaque</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {FEATURED_PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
