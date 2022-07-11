import StartScreen from './components/StartScreen/StartScreen';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
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
      {!isPlaying && (
        <>
          <GlobalStyles styles={{ body: { backgroundColor: theme.palette.primary.dark } }} />
          <StartScreen setIsPlaying={setIsPlaying} gameConfigData={gameConfigData} setGameConfigData={setGameConfigData} />
        </>
      )}
      {isPlaying && <GameBoard isMultiPlayer={gameConfigData.numOfPlayers > 1} setIsPlaying={setIsPlaying} gameConfigData={gameConfigData} />}
    </ThemeProvider>
  );
}
