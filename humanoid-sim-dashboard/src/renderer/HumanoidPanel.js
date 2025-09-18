import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useStore } from './store';
export const HumanoidPanel = () => {
    const { morphWeights, updateMorph, resetMorphs } = useStore();
    const sliders = [
        { label: 'Height', index: 0 },
        { label: 'Limb Length', index: 1 },
        { label: 'Shoulder Width', index: 2 },
        // Add more up to 10
    ];
    return (_jsxs("div", { children: [sliders.map(({ label, index }) => (_jsxs("div", { children: [_jsxs("label", { children: [label, ": ", morphWeights[index].toFixed(2)] }), _jsx("input", { type: "range", min: 0, max: 1, step: 0.01, value: morphWeights[index], onChange: (e) => updateMorph(index, parseFloat(e.target.value)) })] }, index))), _jsx("button", { onClick: resetMorphs, children: "Reset" })] }));
};
