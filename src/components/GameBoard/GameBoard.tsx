import { Box } from '@mui/material';
import { Container } from '@mui/system';
import GameButtonSecondary from '../Buttons/GameButtonSecondary';
import GameButtonPrimary from '../Buttons/GameButtonPrimary';
import Logo from '../Logo/Logo';
import { ButtonStyles, GameBoardContainerStyles, HeaderButtonStyles, HeaderStyles } from './GameBoard.styles';
import MainArea from './MainArea/MainArea';
import { GameConfigData } from '../../interfaces';

interface GameBoardProps {
  gameConfigData: GameConfigData;
}

export default function GameBoard({ gameConfigData }: GameBoardProps) {
  return (
    <Container maxWidth='lg' sx={GameBoardContainerStyles}>
      <Box component='header' sx={HeaderStyles}>
        <Logo />
        <GameButtonPrimary sx={{ ...ButtonStyles, ...HeaderButtonStyles }}>Restart</GameButtonPrimary>
        <GameButtonSecondary sx={ButtonStyles}>New Game</GameButtonSecondary>
      </Box>
      <MainArea gameConfigData={gameConfigData} />
    </Container>
  );
}
