import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`bg-brand-surface border border-brand-border rounded-xl p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);


const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card className="group flex items-center space-x-4 transition-transform transform hover:scale-105 hover:border-brand-primary">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-brand-secondary rounded-lg text-white transition-colors group-hover:bg-brand-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-brand-text-secondary">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-brand-text-primary">{value}</p>
      </div>
    </Card>
  );
};

export default StatCard;