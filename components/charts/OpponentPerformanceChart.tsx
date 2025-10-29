// FIX: Create the OpponentPerformanceChart component.
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PerformanceData } from '../../types';

interface OpponentPerformanceChartProps {
  data: PerformanceData[];
}

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-brand-surface border border-brand-border rounded-xl p-6 ${className}`}>
      {children}
    </div>
);

const OpponentPerformanceChart: React.FC<OpponentPerformanceChartProps> = ({ data }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold text-brand-text-primary mb-4">Performance vs. Opponent Teams</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis dataKey="name" stroke="#8B949E" />
            <YAxis yAxisId="left" stroke="#8B949E" />
            <YAxis yAxisId="right" orientation="right" stroke="#8B949E" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#161B22',
                borderColor: '#30363D',
                color: '#C9D1D9'
              }}
            />
            <Legend wrapperStyle={{color: '#8B949E'}}/>
            <Bar yAxisId="left" dataKey="runs" fill="#58A6FF" name="Runs Scored" />
            <Bar yAxisId="right" dataKey="average" fill="#F7B01E" name="Batting Average" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default OpponentPerformanceChart;
