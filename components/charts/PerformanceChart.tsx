
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  data: {
    year: number;
    runs: number;
    average: number;
  }[];
}

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-brand-surface border border-brand-border rounded-xl p-6 ${className}`}>
      {children}
    </div>
);

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold text-brand-text-primary mb-4">Performance Over Time</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis dataKey="year" stroke="#8B949E" />
            <YAxis yAxisId="left" stroke="#8B949E" label={{ value: 'Runs', angle: -90, position: 'insideLeft', fill: '#8B949E' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#8B949E" label={{ value: 'Average', angle: -90, position: 'insideRight', fill: '#8B949E' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#161B22',
                borderColor: '#30363D',
                color: '#C9D1D9'
              }}
            />
            <Legend wrapperStyle={{color: '#8B949E'}}/>
            <Line yAxisId="left" type="monotone" dataKey="runs" stroke="#58A6FF" strokeWidth={2} name="Runs Scored" />
            <Line yAxisId="right" type="monotone" dataKey="average" stroke="#3FB950" strokeWidth={2} name="Batting Average" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PerformanceChart;
