import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function Header(): JSX.Element {
  const { setTheme, theme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold"
        >
          Portfólio Victor
        </motion.h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={
            theme === "dark"
              ? "Mudar para modo claro"
              : "Mudar para modo escuro"
          }
        >
          {theme === "dark" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </motion.header>
  );
}
