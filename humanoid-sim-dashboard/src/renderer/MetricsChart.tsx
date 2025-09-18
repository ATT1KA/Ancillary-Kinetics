import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props { data: any[] }

export const MetricsChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      { label: 'Reward', data: data.map(d => d.reward || 0), borderColor: 'green' },
      { label: 'Episode Length', data: data.map(d => d.length || 0), borderColor: 'blue' }
    ]
  };

  return <Line data={chartData} options={{ responsive: true }} />;
};