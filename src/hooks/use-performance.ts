import { useEffect } from "react";
import { PerformanceMonitor } from "../utils/performance";

export function usePerformanceMonitor(componentName: string): void {
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.startMeasure(`render-${componentName}`);

    return () => {
      monitor.endMeasure(`render-${componentName}`);
      if (process.env.NODE_ENV === "development") {
        console.log(
          `Performance of ${componentName}:`,
          monitor.getMetrics()[`render-${componentName}`]
        );
      }
    };
  }, [componentName]);
}
