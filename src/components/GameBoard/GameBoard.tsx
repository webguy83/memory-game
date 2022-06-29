import { Box } from '@mui/material';
import { Container } from '@mui/system';
import GameButtonSecondary from '../Buttons/GameButtonSecondary';
import GameButtonPrimary from '../Buttons/GameButtonPrimary';
import Logo from '../Logo/Logo';
import { HeaderStyles } from './GameBoard.styles';
import MainArea from './MainArea/MainArea';

export default function GameBoard() {
  return (
    <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minHeight: '100vh' }}>
      <Box component='header' sx={HeaderStyles}>
        <Logo />
        <GameButtonPrimary sx={{ fontSize: 20, px: 3, py: 1, ml: 'auto', mr: 2 }}>Restart</GameButtonPrimary>
        <GameButtonSecondary sx={{ px: 3, py: 1 }}>New Game</GameButtonSecondary>
      </Box>
      <MainArea />
    </Container>
  );
}
