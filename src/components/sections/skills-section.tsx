import { motion } from "framer-motion";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { TECHNOLOGIES, TOOLS } from "../../constants/portfolio-data";

export function SkillsSection(): JSX.Element {
  return (
    <section className="mb-24">
      <h3 className="text-3xl font-bold mb-8">Tecnologias</h3>
      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-semibold mb-4">
              Principais Habilidades
            </h4>
            {TECHNOLOGIES.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between">
                  <span>{tech.name}</span>
                  <span>{tech.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${tech.proficiency}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-xl font-semibold mb-4">
              Ferramentas & Tecnologias
            </h4>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant="secondary"
                          className="text-sm py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tool}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tool}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Card>
    </section>
  );
}
