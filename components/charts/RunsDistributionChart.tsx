
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RunsDistributionChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-brand-surface border border-brand-border rounded-xl p-6 h-full ${className}`}>
      {children}
    </div>
);

const RunsDistributionChart: React.FC<RunsDistributionChartProps> = ({ data }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold text-brand-text-primary mb-4">Runs Distribution</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis type="number" stroke="#8B949E" />
            <YAxis dataKey="name" type="category" stroke="#8B949E" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#161B22',
                borderColor: '#30363D',
                color: '#C9D1D9'
              }}
              cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}
            />
            <Bar dataKey="value" fill="#58A6FF" name="Total Runs"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RunsDistributionChart;
