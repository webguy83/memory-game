import StartScreen from './components/StartScreen/StartScreen';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { useState } from 'react';
import { GameConfigData } from './interfaces';
import GameBoard from './components/GameBoard/GameBoard';

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameConfigData, setGameConfigData] = useState<GameConfigData>({
    gameTheme: 'Numbers',
    numOfPlayers: 1,
    gridSize: '4x4',
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isPlaying && <StartScreen setIsPlaying={setIsPlaying} gameConfigData={gameConfigData} setGameConfigData={setGameConfigData} />}
      {isPlaying && <GameBoard setIsPlaying={setIsPlaying} gameConfigData={gameConfigData} />}
    </ThemeProvider>
  );
}
