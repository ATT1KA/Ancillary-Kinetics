import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useStore } from './store';
import { HumanoidModel } from './HumanoidModel';
import { HumanoidPanel } from './HumanoidPanel';
import { TrainingPanel } from './TrainingPanel';
import { MetricsChart } from './MetricsChart';
const App = () => {
    const { morphWeights } = useStore();
    const [cudaAvailable, setCudaAvailable] = useState(false);
    const [metrics, setMetrics] = useState([]);
    useEffect(() => {
        window.api.detectCUDA().then(setCudaAvailable);
        window.api.onMetricsStream((data) => {
            try {
                const parsed = JSON.parse(data);
                setMetrics((prev) => [...prev, parsed]);
            }
            catch { }
        });
        window.api.onErrorStream((data) => {
            console.error('Error from Python:', data);
        });
    }, []);
    return (_jsxs("div", { style: { display: 'flex', height: '100vh', background: '#222' }, children: [_jsxs("div", { style: { width: '25%', padding: 10, background: '#333', color: 'white' }, children: [_jsx("h3", { children: "Humanoid Panel" }), _jsx(HumanoidPanel, {}), _jsxs("h3", { children: ["Training Panel (CUDA: ", cudaAvailable ? 'Yes' : 'No', ")"] }), _jsx(TrainingPanel, {})] }), _jsx("div", { style: { flex: 1 }, children: _jsxs(Canvas, { camera: { position: [0, 1, 3] }, children: [_jsx("ambientLight", { intensity: 0.5 }), _jsx("gridHelper", { args: [10, 10] }), _jsx(OrbitControls, {}), _jsx(HumanoidModel, { morphInfluences: morphWeights })] }) }), _jsxs("div", { style: { width: '25%', padding: 10, background: '#333', color: 'white' }, children: [_jsx("h3", { children: "Metrics" }), _jsx(MetricsChart, { data: metrics })] })] }));
};
export default App;
