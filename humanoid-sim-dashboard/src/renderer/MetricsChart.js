import { jsx as _jsx } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export const MetricsChart = ({ data }) => {
    const chartData = {
        labels: data.map((_, i) => i),
        datasets: [
            { label: 'Reward', data: data.map(d => d.reward || 0), borderColor: 'green' },
            { label: 'Episode Length', data: data.map(d => d.length || 0), borderColor: 'blue' }
        ]
    };
    return _jsx(Line, { data: chartData, options: { responsive: true } });
};
