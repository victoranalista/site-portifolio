import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { FileCheck } from "lucide-react";
import { MatrixRain } from "../../components/animations/matrix-rain";
import { TypewriterEffect } from "../../components/animations/typewriter-effect";
import { LoadingScreen } from "../../components/sections/loading-screen";
import { useTerminalAnimation } from "../../hooks/use-terminal-animation";
import { TERMINAL_STEPS } from "../../constants/portfolio-data";

interface TerminalAnimationProps {
  onComplete: () => void;
}

export function TerminalAnimation({
  onComplete,
}: TerminalAnimationProps): JSX.Element {
  const {
    currentStep,
    isLoading,
    userInteracted,
    handleStepComplete,
    handleInitiateSystem,
    setUserInteracted,
  } = useTerminalAnimation({ onComplete });

  // If not interacted, show button to start
  if (!userInteracted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
      >
        <MatrixRain />
        <div className="relative z-10 bg-black/90 p-8 rounded-lg border border-emerald-500 max-w-3xl w-full mx-4 text-center">
          <h2 className="text-2xl text-emerald-500 mb-6">
            Portfólio Dev Victor
          </h2>
          <Button
            onClick={() => setUserInteracted(true)}
            size="lg"
            className="bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300 font-bold text-lg px-8 py-6"
          >
            ENTRAR
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <MatrixRain />

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="relative z-10 bg-black/90 p-8 rounded-lg border border-emerald-500 max-w-3xl w-full mx-4">
          <div className="flex items-center gap-2 mb-4 text-emerald-500">
            <FileCheck className="w-6 h-6" />
            <span className="text-lg font-bold">
              PROTOCOLO DE INOVAÇÃO DE DESENVOLVIMENTO
            </span>
          </div>

          <div className="font-mono text-emerald-500 min-h-[200px] relative">
            <TypewriterEffect
              text={TERMINAL_STEPS[currentStep]}
              onComplete={handleStepComplete}
            />

            {currentStep === TERMINAL_STEPS.length - 1 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-8 flex justify-center"
              >
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-4 border-emerald-500 rounded-full"
                  />
                  <Avatar className="w-32 h-32 ring-4 ring-emerald-500">
                    <AvatarImage
                      src="https://github.com/victoranalista.png"
                      alt="Victor"
                    />
                    <AvatarFallback>VA</AvatarFallback>
                  </Avatar>
                </div>
              </motion.div>
            )}
          </div>

          {currentStep === TERMINAL_STEPS.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <Button
                onClick={handleInitiateSystem}
                size="lg"
                className="bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300 font-bold text-lg px-8 py-6"
              >
                INICIAR DESENCAPSULAMENTO
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}
