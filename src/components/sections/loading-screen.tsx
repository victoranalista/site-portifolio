import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

export function LoadingScreen(): JSX.Element {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 2.5;
        if (nextProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return nextProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="text-center">
        <Progress value={progress} className="w-64" />
        <p className="text-gray-500 text-lg mt-4">
          Desencapsulando sistema{progress < 100 ? "..." : " concluído!"}
        </p>
      </div>
    </div>
  );
}
