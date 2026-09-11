export type CarCategory = 'all' | 'meta' | 'race' | 'drift' | 'offroad';

export interface LiveTuning {
  steeringSensitivity: number; // e.g. -5 to +5
  downforce: number; // e.g. -5 to +5
  tractionControl: boolean;
  driftStyle: 'Gas Tap' | 'Brake Tap' | 'Default';
}

export interface CarBuild {
  id: string;
  name: string;
  brand: string;
  year: number;
  category: CarCategory;
  typeLabel: string;
  rating: string;
  drivetrain: 'AWD' | 'RWD' | 'FWD';
  zeroToSixty: string;
  topSpeed: string;
  quarterMile: string;
  power: string;
  torque: string;
  recommendedEngine: string;
  induction: string;
  nitrous: string;
  suspension: string;
  tires: string;
  clutch: string;
  gearbox: string;
  differential: string;
  auxiliaryPassive: string;
  auxiliaryActive: string;
  liveTuning: LiveTuning;
  videoId?: string;
  youtubeUrl: string;
  proTips: string;
  imageUrl: string;
  badgeGradient: string;
}
