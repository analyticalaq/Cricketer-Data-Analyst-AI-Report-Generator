import React, { useState } from 'react';
import { GenerateIcon } from './Icons';

interface UrlInputProps {
  onSubmit: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState<string>('https://www.espncricinfo.com/player/virat-kohli-253802');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] overflow-hidden rounded-xl">
       <div className="absolute inset-0 -z-10 bg-brand-surface [background:radial-gradient(125%_125%_at_50%_10%,#0D1117_40%,#1F6FEB_100%)] opacity-30"></div>
      <div className="w-full max-w-2xl text-center z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text-primary mb-2">
          Unlock Cricketing Insights
        </h2>
        <p className="text-lg text-brand-text-secondary mb-8">
          Paste a cricketer's profile URL (e.g., from ESPNcricinfo) to generate a complete visual report and AI-driven analysis.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.espncricinfo.com/player/..."
            className="flex-grow px-4 py-3 bg-brand-surface border border-brand-border rounded-lg text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
          >
            <GenerateIcon />
            Generate Report
          </button>
        </form>
         <p className="text-sm text-brand-text-secondary mt-4">
            Example: <span className="font-mono text-brand-text-primary">https://www.espncricinfo.com/player/virat-kohli-253802</span>
        </p>
      </div>
    </div>
  );
};

export default UrlInput;