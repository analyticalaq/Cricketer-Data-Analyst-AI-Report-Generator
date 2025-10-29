import React from 'react';
import type { PlayerData } from '../types';

interface PlayerProfileProps {
  data: PlayerData;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ data }) => {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
      <img
        src={data.playerImage}
        alt={data.playerName}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-brand-primary shadow-lg shadow-brand-primary/20"
        onError={(e) => {
          // Fallback in case of broken image URL
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128';
        }}
      />
      <div className="text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary">{data.playerName}</h2>
        <p className="text-md sm:text-lg text-brand-text-secondary">
          {data.profile.role} | {data.profile.battingStyle} | {data.profile.bowlingStyle}
        </p>
      </div>
    </div>
  );
};

export default PlayerProfile;