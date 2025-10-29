
import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { PlayerData, ComparisonData } from '../../types';

interface ComparisonRadarChartProps {
  player1: PlayerData;
  player2: ComparisonData;
}

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-brand-bg border border-brand-border rounded-xl p-6 ${className}`}>
      {children}
    </div>
);


const ComparisonRadarChart: React.FC<ComparisonRadarChartProps> = ({ player1, player2 }) => {
  const p1Stats = player1.careerSummary;
  const p2Stats = player2.careerSummary;

  const data = [
    { subject: 'Batting Avg', A: p1Stats.battingAverage, B: p2Stats.battingAverage },
    { subject: 'Strike Rate', A: p1Stats.strikeRate, B: p2Stats.strikeRate },
    { subject: 'Runs', A: p1Stats.runs, B: p2Stats.runs },
    { subject: '100s', A: p1Stats.hundreds, B: p2Stats.hundreds },
    { subject: '50s', A: p1Stats.fifties, B: p2Stats.fifties },
    { subject: 'Matches', A: p1Stats.matches, B: p2Stats.matches },
  ];

  // Normalize data for better visualization
  const normalizedData = data.map(stat => {
    const maxVal = Math.max(stat.A, stat.B, 1); // Avoid division by zero
    return {
        ...stat,
        A_norm: (stat.A / maxVal) * 100,
        B_norm: (stat.B / maxVal) * 100,
    }
  });


  return (
    <Card>
        <h3 className="text-xl font-bold text-brand-text-primary mb-4 text-center">Head-to-Head Comparison</h3>
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={normalizedData}>
                <PolarGrid stroke="#30363D" />
                <PolarAngleAxis dataKey="subject" stroke="#8B949E" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#161B22',
                        borderColor: '#30363D',
                        color: '#C9D1D9'
                    }}
                    formatter={(value, name, props) => {
                        const originalKey = name.replace('_norm', '');
                        const originalStat = data.find(d => d.subject === props.payload.subject);
                        return originalStat ? originalStat[originalKey] : value;
                    }}
                />
                <Legend wrapperStyle={{color: '#8B949E'}} />
                <Radar name={player1.playerName} dataKey="A_norm" stroke="#58A6FF" fill="#58A6FF" fillOpacity={0.6} />
                <Radar name={player2.playerName} dataKey="B_norm" stroke="#3FB950" fill="#3FB950" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    </Card>
  );
};

export default ComparisonRadarChart;
