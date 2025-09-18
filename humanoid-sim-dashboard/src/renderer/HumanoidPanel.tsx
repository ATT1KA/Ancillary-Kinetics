import React from 'react';
import { useStore } from './store';

export const HumanoidPanel: React.FC = () => {
  const { morphWeights, updateMorph, resetMorphs } = useStore();

  const sliders = [
    { label: 'Height', index: 0 },
    { label: 'Limb Length', index: 1 },
    { label: 'Shoulder Width', index: 2 },
    // Add more up to 10
  ];

  return (
    <div>
      {sliders.map(({ label, index }) => (
        <div key={index}>
          <label>{label}: {morphWeights[index].toFixed(2)}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={morphWeights[index]}
            onChange={(e) => updateMorph(index, parseFloat(e.target.value))}
          />
        </div>
      ))}
      <button onClick={resetMorphs}>Reset</button>
    </div>
  );
};