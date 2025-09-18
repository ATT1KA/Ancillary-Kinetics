import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useStore } from './store';
import { HumanoidModel } from './HumanoidModel';
import { HumanoidPanel } from './HumanoidPanel';
import { TrainingPanel } from './TrainingPanel';
import { MetricsChart } from './MetricsChart';

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

const App: React.FC = () => {
  const { morphWeights } = useStore();
  const [cudaAvailable, setCudaAvailable] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    window.api.detectCUDA().then(setCudaAvailable);
    window.api.onMetricsStream((data) => {
      try {
        const parsed = JSON.parse(data);
        setMetrics((prev) => [...prev, parsed]);
      } catch {}
    });
    window.api.onErrorStream((data) => {
      console.error('Error from Python:', data);
    });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#222' }}>
      <div style={{ width: '25%', padding: 10, background: '#333', color: 'white' }}>
        <h3>Humanoid Panel</h3>
        <HumanoidPanel />
        <h3>Training Panel (CUDA: {cudaAvailable ? 'Yes' : 'No'})</h3>
        <TrainingPanel />
      </div>
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={0.5} />
          <gridHelper args={[10, 10]} />
          <OrbitControls />
          <HumanoidModel morphInfluences={morphWeights} />
        </Canvas>
      </div>
      <div style={{ width: '25%', padding: 10, background: '#333', color: 'white' }}>
        <h3>Metrics</h3>
        <MetricsChart data={metrics} />
      </div>
    </div>
  );
};

export default App;