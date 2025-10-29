// FIX: Define and export interfaces to make this file a module and provide types for the application.
export interface PlayerProfileData {
  role: string;
  battingStyle: string;
  bowlingStyle: string;
}

export interface CareerSummary {
  matches: number;
  runs: number;
  wickets: number;
  battingAverage: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  bestBowling: string;
}

export interface PerformanceOverTime {
  year: number;
  runs: number;
  average: number;
}

export interface DismissalAnalysis {
  method: string;
  count: number;
}

export interface RunsDistribution {
  name: string;
  value: number;
}

export interface PerformanceData {
    name: string;
    matches: number;
    runs: number;
    average: number;
    wickets?: number; // Optional for bowlers
}

export interface BowlingStats {
    format: string;
    matches: number;
    wickets: number;
    economy: number;
    average: number;
}

export interface PlayerData {
  playerName: string;
  playerImage: string;
  profile: PlayerProfileData;
  careerSummary: CareerSummary;
  performanceOverTime: PerformanceOverTime[];
  dismissalAnalysis: DismissalAnalysis[];
  runsDistribution: RunsDistribution[];
  executiveSummary: string;
  performanceVsCountry: PerformanceData[];
  performanceVsOpponent: PerformanceData[];
  bowlingStats: BowlingStats[];
}

export interface ComparisonData {
    playerName: string;
    playerImage: string;
    careerSummary: CareerSummary;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    sources?: Source[];
}

export interface Source {
    uri: string;
    title: string;
}
