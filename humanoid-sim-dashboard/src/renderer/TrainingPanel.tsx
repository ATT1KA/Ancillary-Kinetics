import React, { useState } from 'react';
import { useTrainingStore } from './store';

export const TrainingPanel: React.FC = () => {
  const [config, setConfig] = useState({ env: 'Humanoid-v4', algo: 'PPO', timesteps: 10000, device: 'cuda' });
  const { startTraining } = useTrainingStore();

  const handleStart = async () => {
    await startTraining(config);
  };

  return (
    <div>
      <select value={config.env} onChange={(e) => setConfig({ ...config, env: e.target.value })}>
        <option>Humanoid-v4</option>
      </select>
      <select value={config.algo} onChange={(e) => setConfig({ ...config, algo: e.target.value })}>
        <option>PPO</option>
        <option>SAC</option>
      </select>
      <input
        type="number"
        value={config.timesteps}
        onChange={(e) => setConfig({ ...config, timesteps: parseInt(e.target.value) })}
      />
      <button onClick={handleStart}>Start Training</button>
    </div>
  );
};