// FIX: Create the BowlingStatsChart component.
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BowlingStats } from '../../types';

interface BowlingStatsChartProps {
  data: BowlingStats[];
}

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-brand-surface border border-brand-border rounded-xl p-6 h-full ${className}`}>
      {children}
    </div>
);

const BowlingStatsChart: React.FC<BowlingStatsChartProps> = ({ data }) => {
    return (
        <Card>
          <h3 className="text-xl font-bold text-brand-text-primary mb-4">Bowling Stats by Format</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                <XAxis dataKey="format" stroke="#8B949E" />
                <YAxis yAxisId="left" orientation="left" stroke="#8B949E" label={{ value: 'Wickets', angle: -90, position: 'insideLeft', fill: '#8B949E' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#8B949E" label={{ value: 'Economy', angle: 90, position: 'insideRight', fill: '#8B949E' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#161B22',
                    borderColor: '#30363D',
                    color: '#C9D1D9'
                  }}
                />
                <Legend wrapperStyle={{color: '#8B949E'}} />
                <Bar yAxisId="left" dataKey="wickets" fill="#3FB950" name="Total Wickets" />
                <Bar yAxisId="right" dataKey="economy" fill="#A371F7" name="Economy Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
    );
};

export default BowlingStatsChart;
