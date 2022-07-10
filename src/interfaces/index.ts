import { GameTheme, GridSize } from '../types';

export interface GameConfigData {
  gameTheme: GameTheme;
  numOfPlayers: number;
  gridSize: GridSize;
}

export interface Item {
  value: any;
  index: number;
  selected: boolean;
  hasAlreadyBeenMatch: boolean;
}

export interface ResultsData {
  label: string;
  value: string;
  highlight: boolean;
}

export interface GamePlayerStat {
  name: string;
  fullName: string;
  score: number;
  currentPlayer: boolean;
}
