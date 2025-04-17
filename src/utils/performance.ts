export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Record<string, number[]> = {};

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasure(id: string): void {
    if (typeof performance === "undefined") return;

    performance.mark(`${id}-start`);
  }

  endMeasure(id: string): void {
    if (typeof performance === "undefined") return;

    performance.mark(`${id}-end`);
    performance.measure(id, `${id}-start`, `${id}-end`);

    const entries = performance.getEntriesByName(id);
    const lastEntry = entries[entries.length - 1];

    if (lastEntry) {
      if (!this.metrics[id]) {
        this.metrics[id] = [];
      }
      this.metrics[id].push(lastEntry.duration);
      performance.clearMarks(`${id}-start`);
      performance.clearMarks(`${id}-end`);
      performance.clearMeasures(id);
    }
  }

  getMetrics(): Record<
    string,
    { avg: number; min: number; max: number; last: number }
  > {
    const result: Record<
      string,
      { avg: number; min: number; max: number; last: number }
    > = {};

    Object.entries(this.metrics).forEach(([key, values]) => {
      if (values.length === 0) return;

      const sum = values.reduce((acc, val) => acc + val, 0);
      result[key] = {
        avg: sum / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        last: values[values.length - 1],
      };
    });

    return result;
  }

  clearMetrics(): void {
    this.metrics = {};
  }
}
