import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from '../Logo/Logo';
import DataGroup from './DataGroup/DataGroup';
import GameButtonPrimary from '../Buttons/GameButtonPrimary';
import { GameConfigData } from '../../interfaces';
import { GameTheme, GridSize } from '../../enums';
import { GroupOfButtonStyles, BackgroundStyles, ContainerStyles } from './StartScreen.styles';

interface StartScreenProps {
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setGameConfigData: Dispatch<SetStateAction<GameConfigData>>;
  gameConfigData: GameConfigData;
}

export default function StartScreen({ setIsPlaying, setGameConfigData, gameConfigData }: StartScreenProps) {
  const [numOfPlayers, setNumOfPlayers] = useState<string>(gameConfigData.numOfPlayers.toString());
  const [gameTheme, setGameTheme] = useState(gameConfigData.gameTheme);
  const [gridSize, setGridSize] = useState(gameConfigData.gridSize);

  const handlePlayers = (_evt: MouseEvent<HTMLElement>, newNumOfPlayers: string) => {
    if (newNumOfPlayers) {
      setNumOfPlayers(newNumOfPlayers);
    }
  };

  const handleGameTheme = (_evt: MouseEvent<HTMLElement>, newGameTheme: GameTheme) => {
    if (newGameTheme) {
      setGameTheme(newGameTheme);
    }
  };

  const handleGridSize = (_evt: MouseEvent<HTMLElement>, newGridSize: GridSize) => {
    if (newGridSize) {
      setGridSize(newGridSize);
    }
  };

  const startGameClick = () => {
    setIsPlaying(true);
    setGameConfigData({
      gameTheme,
      numOfPlayers: parseInt(numOfPlayers),
      gridSize,
    });
  };
  return (
    <Box sx={BackgroundStyles}>
      <Container maxWidth='md' sx={ContainerStyles}>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography variant='h1'>
            <Logo lightColor />
          </Typography>
          <Box width='100%' sx={GroupOfButtonStyles}>
            <DataGroup groupLabel='Select Theme' groupValue={gameTheme} handleChange={handleGameTheme} buttonValues={[GameTheme.Numbers, GameTheme.Icons]} />
            <DataGroup groupLabel='Number of Players' groupValue={numOfPlayers} handleChange={handlePlayers} buttonValues={['1', '2', '3', '4']} />
            <DataGroup groupLabel='Grid Size' groupValue={gridSize} handleChange={handleGridSize} buttonValues={[GridSize.four, GridSize.six]} />
            <GameButtonPrimary onClick={startGameClick}>Start Game</GameButtonPrimary>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
