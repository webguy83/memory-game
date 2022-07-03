export interface GameConfigData {
  gameTheme: string;
  numOfPlayers: number;
  gridSize: string;
}

export interface Item {
  value: any;
  index: number;
  selected: boolean;
  hasAlreadyBeenMatch: boolean;
}
