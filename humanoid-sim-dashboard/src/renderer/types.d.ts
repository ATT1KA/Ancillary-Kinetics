declare global {
  interface Window {
    api: {
      detectCUDA: () => Promise<boolean>;
      startTraining: (config: any) => Promise<any>;
      onMetricsStream: (callback: (data: string) => void) => void;
      onErrorStream: (callback: (data: string) => void) => void;
    };
  }
}