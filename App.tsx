
import React, { useState, useCallback } from 'react';
import { PlayerData } from './types';
import { generateReport } from './services/geminiService';
import Dashboard from './components/Dashboard';
import UrlInput from './components/UrlInput';
import { Spinner, ErrorIcon, CricketIcon } from './components/Icons';

const App: React.FC = () => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = useCallback(async (url: string) => {
    if (!url) {
      setError('Please enter a URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPlayerData(null);

    try {
      const data = await generateReport(url);
      setPlayerData(data);
    } catch (e) {
      console.error(e);
      setError('Failed to generate report. The player might not be well-known, or there was an API error. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setPlayerData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <CricketIcon className="h-8 w-8 text-brand-primary" />
            <h1 className="text-2xl font-bold text-brand-text-primary tracking-tight">Cricket Analyst AI</h1>
          </div>
          {playerData && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-brand-secondary text-white rounded-lg hover:bg-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
            >
              New Report
            </button>
          )}
        </header>

        <main>
          {!playerData && !isLoading && !error && (
            <UrlInput onSubmit={handleUrlSubmit} />
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Spinner className="h-12 w-12 mb-4" />
              <p className="text-xl font-semibold text-brand-text-primary">Analyzing Player Data...</p>
              <p className="text-brand-text-secondary">AI is generating charts and insights. This might take a moment.</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center h-96 text-center bg-brand-surface border border-brand-danger rounded-lg p-6">
              <ErrorIcon className="h-12 w-12 text-brand-danger mb-4" />
              <p className="text-xl font-semibold text-brand-danger">An Error Occurred</p>
              <p className="text-brand-text-secondary mb-4">{error}</p>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-brand-danger text-white rounded-lg hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-danger focus:ring-opacity-50"
              >
                Try Again
              </button>
            </div>
          )}
          
          {playerData && !isLoading && <Dashboard initialData={playerData} />}
        </main>
      </div>
    </div>
  );
};

export default App;
