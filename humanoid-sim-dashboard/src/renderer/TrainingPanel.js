import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTrainingStore } from './store';
export const TrainingPanel = () => {
    const [config, setConfig] = useState({ env: 'Humanoid-v4', algo: 'PPO', timesteps: 10000, device: 'cuda' });
    const { startTraining } = useTrainingStore();
    const handleStart = async () => {
        await startTraining(config);
    };
    return (_jsxs("div", { children: [_jsx("select", { value: config.env, onChange: (e) => setConfig({ ...config, env: e.target.value }), children: _jsx("option", { children: "Humanoid-v4" }) }), _jsxs("select", { value: config.algo, onChange: (e) => setConfig({ ...config, algo: e.target.value }), children: [_jsx("option", { children: "PPO" }), _jsx("option", { children: "SAC" })] }), _jsx("input", { type: "number", value: config.timesteps, onChange: (e) => setConfig({ ...config, timesteps: parseInt(e.target.value) }) }), _jsx("button", { onClick: handleStart, children: "Start Training" })] }));
};
