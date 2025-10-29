import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface DismissalChartProps {
  data: {
    method: string;
    count: number;
  }[];
}

const COLORS = ['#58A6FF', '#1F6FEB', '#3FB950', '#F85149', '#A371F7', '#F7B01E'];

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-brand-surface border border-brand-border rounded-xl p-6 h-full ${className}`}>
      {children}
    </div>
);

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textRadius = radius + (outerRadius - innerRadius) * 0.7;
  const textX = cx + textRadius * Math.cos(-midAngle * RADIAN);
  const textY = cy + textRadius * Math.sin(-midAngle * RADIAN);


  return (
    <>
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="14px" fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text x={textX} y={textY} fill="#8B949E" textAnchor={textX > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
        {payload.method}
      </text>
    </>
  );
};


const DismissalChart: React.FC<DismissalChartProps> = ({ data }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold text-brand-text-primary mb-4">Dismissal Analysis</h3>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={70}
              outerRadius={110}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="count"
              nameKey="method"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
                contentStyle={{
                    backgroundColor: '#161B22',
                    borderColor: '#30363D',
                    color: '#C9D1D9'
                }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DismissalChart;