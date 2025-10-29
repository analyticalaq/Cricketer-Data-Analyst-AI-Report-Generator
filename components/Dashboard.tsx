// FIX: Create the Dashboard component to render the analysis report.
import React from 'react';
import type { PlayerData } from '../types';
import PlayerProfile from './PlayerProfile';
import StatCard from './StatCard';
import ExecutiveSummary from './ExecutiveSummary';
import PerformanceChart from './charts/PerformanceChart';
import DismissalChart from './charts/DismissalChart';
import RunsDistributionChart from './charts/RunsDistributionChart';
import PlayerComparison from './PlayerComparison';
import ChatBot from './ChatBot';
import HighlightCard from './HighlightCard';
import CountryPerformanceChart from './charts/CountryPerformanceChart';
import OpponentPerformanceChart from './charts/OpponentPerformanceChart';
import BowlingStatsChart from './charts/BowlingStatsChart';
import { ChartBarIcon, TrophyIcon } from './Icons';

interface DashboardProps {
  initialData: PlayerData;
}

const Dashboard: React.FC<DashboardProps> = ({ initialData }) => {
  const { 
    playerName, 
    careerSummary, 
    executiveSummary,
    performanceOverTime,
    dismissalAnalysis,
    runsDistribution,
    performanceVsCountry,
    performanceVsOpponent,
    bowlingStats,
 } = initialData;

  const highestScoreVsOpponent = [...performanceVsOpponent].sort((a, b) => b.runs - a.runs)[0];
  const mostWicketsVsCountry = [...performanceVsCountry].sort((a, b) => (b.wickets ?? 0) - (a.wickets ?? 0))[0];

  return (
    <div className="space-y-6">
      <PlayerProfile data={initialData} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Matches" value={careerSummary.matches} icon={<ChartBarIcon className="w-6 h-6" />} />
        <StatCard title="Total Runs" value={careerSummary.runs.toLocaleString()} icon={<TrophyIcon className="w-6 h-6" />} />
        <StatCard title="Batting Avg" value={careerSummary.battingAverage.toFixed(2)} icon={<ChartBarIcon className="w-6 h-6" />} />
        <StatCard title="Total Wickets" value={careerSummary.wickets} icon={<TrophyIcon className="w-6 h-6" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <PerformanceChart data={performanceOverTime} />
        </div>
        <ExecutiveSummary summary={executiveSummary} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <DismissalChart data={dismissalAnalysis} />
         <RunsDistributionChart data={runsDistribution} />
         <BowlingStatsChart data={bowlingStats} />
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highestScoreVsOpponent && (
            <HighlightCard 
                title="Highest Runs Scored Against"
                value={highestScoreVsOpponent.runs}
                subtitle={`vs ${highestScoreVsOpponent.name}`}
                icon={<TrophyIcon className="w-8 h-8"/>}
            />
        )}
        {mostWicketsVsCountry && (
            <HighlightCard 
                title="Most Wickets Taken Against"
                value={mostWicketsVsCountry.wickets ?? 0}
                subtitle={`vs ${mostWicketsVsCountry.name}`}
                icon={<TrophyIcon className="w-8 h-8"/>}
            />
        )}
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CountryPerformanceChart data={performanceVsCountry} />
        <OpponentPerformanceChart data={performanceVsOpponent} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlayerComparison basePlayer={initialData} />
        <ChatBot playerName={playerName} />
      </div>

    </div>
  );
};

export default Dashboard;
