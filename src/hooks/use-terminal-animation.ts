import { useState, useEffect, useMemo } from "react";
import { AudioService } from "../services/audio-service";
import { StorageService } from "../services/storage-service";
import { TERMINAL_STEPS } from "../constants/portfolio-data";

interface UseTerminalAnimationProps {
  onComplete: () => void;
}

interface UseTerminalAnimationReturn {
  currentStep: number;
  isLoading: boolean;
  userInteracted: boolean;
  handleStepComplete: () => void;
  handleInitiateSystem: () => Promise<void>;
  setUserInteracted: (value: boolean) => void;
  audioService: AudioService;
}

export function useTerminalAnimation({
  onComplete,
}: UseTerminalAnimationProps): UseTerminalAnimationReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const audioService = useMemo(
    () =>
      new AudioService({
        typing: "/audio/teclado.mp3",
        ambient: "/audio/suspense.mp3",
        doorOpen: "/audio/porta.mp3",
      }),
    []
  );

  useEffect(() => {
    const hasShownTerminal = StorageService.getItem("hasShownTerminal");
    if (hasShownTerminal === "true") {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (userInteracted) {
      audioService.initialize();
      audioService.play("ambient", { volume: 0.6, loop: true });
      return () => {
        audioService.pauseAll();
      };
    }
  }, [audioService, userInteracted]);

  const handleStepComplete = () => {
    if (currentStep < TERMINAL_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      audioService.play("typing", { volume: 0.9 });
    }
  };

  const handleInitiateSystem = async () => {
    setIsLoading(true);
    audioService.pause("ambient");
    audioService.play("doorOpen");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    StorageService.setItem("hasShownTerminal", "true");
    onComplete();
  };

  return {
    currentStep,
    isLoading,
    userInteracted,
    handleStepComplete,
    handleInitiateSystem,
    setUserInteracted,
    audioService,
  };
}
