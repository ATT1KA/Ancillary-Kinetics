import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useStore } from './store';
import { HumanoidModel } from './HumanoidModel';
import { HumanoidPanel } from './HumanoidPanel';
import { TrainingPanel } from './TrainingPanel';
import { MetricsChart } from './MetricsChart';

const App: React.FC = () => {
  const { morphWeights } = useStore();
  const [cudaAvailable, setCudaAvailable] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    window.api.detectCUDA().then(setCudaAvailable);
    ipcRenderer.on('metrics-stream', (event, data) => {
      try {
        const parsed = JSON.parse(data);
        setMetrics((prev) => [...prev, parsed]);
      } catch {}
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