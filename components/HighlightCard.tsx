import React from 'react';

interface HighlightCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 group transition-all duration-300 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/10">
        <div className="flex items-center justify-between">
            <p className="text-md font-semibold text-brand-text-secondary">{title}</p>
            <div className="text-brand-primary opacity-80 group-hover:opacity-100 transition-opacity">
                {icon}
            </div>
        </div>
        <div className="mt-2">
            <p className="text-4xl font-extrabold text-brand-text-primary">{value} <span className="text-2xl font-bold">Runs</span></p>
            <p className="text-lg text-brand-text-secondary">{subtitle}</p>
        </div>
    </div>
  );
};

export default HighlightCard;