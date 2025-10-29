
import React from 'react';
import { LightbulbIcon } from './Icons';

interface ExecutiveSummaryProps {
  summary: string;
}

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-brand-surface border border-brand-border rounded-xl h-full ${className}`}>
      {children}
    </div>
  );
  

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary }) => {
    const points = summary.split(/\d\.\s/).filter(p => p.trim() !== '');

  return (
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <LightbulbIcon className="w-6 h-6 mr-3 text-brand-primary" />
        <h3 className="text-xl font-bold text-brand-text-primary">AI Executive Summary</h3>
      </div>
      <div className="text-brand-text-secondary space-y-3">
        <p className="font-semibold text-brand-text-primary">Top 3 Actionable Areas for Improvement:</p>
        <ul className="list-none space-y-3">
            {points.map((point, index) => (
                 <li key={index} className="flex items-start">
                    <span className="text-brand-primary font-bold mr-3">{index + 1}.</span>
                    <span className="text-brand-text-secondary">{point.trim()}</span>
                 </li>
            ))}
        </ul>
      </div>
    </Card>
  );
};

export default ExecutiveSummary;
