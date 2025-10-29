import React, { useState } from 'react';
import type { PlayerData, ComparisonData } from '../types';
import { generateComparisonReport } from '../services/geminiService';
import { Spinner, ErrorIcon, GenerateIcon } from './Icons';
import ComparisonRadarChart from './charts/ComparisonRadarChart';

interface PlayerComparisonProps {
  basePlayer: PlayerData;
}

const PlayerComparison: React.FC<PlayerComparisonProps> = ({ basePlayer }) => {
  const [playerName, setPlayerName] = useState('');
  const [compareData, setCompareData] = useState<ComparisonData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
        setError("Please enter a player's name to compare.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setCompareData(null);

    try {
      const data = await generateComparisonReport(playerName);
      setCompareData(data);
    } catch (e) {
      console.error(e);
      setError("Could not fetch data for this player. They might not be well-known enough for a comparison.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-brand-text-primary">Compare Player Stats</h3>
        <p className="text-brand-text-secondary">Enter the name of another player to see a side-by-side comparison.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="e.g., Sachin Tendulkar"
          className="flex-grow px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 disabled:bg-brand-text-secondary disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner className="h-5 w-5" /> : <GenerateIcon />}
          Compare
        </button>
      </form>

      {isLoading && (
        <div className="flex flex-col items-center justify-center pt-10">
          <Spinner className="h-10 w-10 mb-4" />
          <p className="font-semibold">Fetching comparison data...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center pt-10 text-center text-brand-danger">
            <ErrorIcon className="h-10 w-10 mb-4" />
            <p className="font-semibold">An Error Occurred</p>
            <p className="text-sm">{error}</p>
        </div>
      )}

      {compareData && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
            <ComparisonCard player={basePlayer} />
            <ComparisonCard player={compareData} />
            <div className="lg:col-span-2">
              <ComparisonRadarChart player1={basePlayer} player2={compareData} />
            </div>
        </div>
      )}
    </div>
  );
};

const ComparisonCard: React.FC<{player: PlayerData | ComparisonData}> = ({player}) => (
    <div className="bg-brand-bg border border-brand-border rounded-lg p-4 flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-4">
        <img src={player.playerImage} alt={player.playerName} className="w-24 h-24 rounded-full object-cover border-2 border-brand-secondary flex-shrink-0" />
        <div>
            <h4 className="text-lg font-bold text-brand-text-primary">{player.playerName}</h4>
            <div className="text-xs grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-brand-text-secondary">
                <span><span className="font-semibold text-brand-text-primary">{player.careerSummary.runs}</span> Runs</span>
                <span><span className="font-semibold text-brand-text-primary">{player.careerSummary.wickets}</span> Wkts</span>
                <span><span className="font-semibold text-brand-text-primary">{player.careerSummary.battingAverage.toFixed(2)}</span> Avg</span>
                <span><span className="font-semibold text-brand-text-primary">{player.careerSummary.strikeRate.toFixed(2)}</span> SR</span>
            </div>
        </div>
    </div>
)

export default PlayerComparison;