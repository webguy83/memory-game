import { Box, Modal, Typography, Container, Stack } from '@mui/material';
import GameButtonSecondary from '../Buttons/GameButtonSecondary';
import GameButtonPrimary from '../Buttons/GameButtonPrimary';
import Logo from '../Logo/Logo';
import { ButtonStyles, FooterStyles, GameBoardContainerStyles, HeaderButtonStyles, HeaderStyles, ModalStyles } from './GameBoard.styles';
import MainArea from './MainArea/MainArea';
import { GameConfigData } from '../../interfaces';
import InfoBlock from './InfoBlock/InfoBlock';
import { useEffect, useState } from 'react';

interface GameBoardProps {
  gameConfigData: GameConfigData;
}

function convertTime(seconds: number) {
  let output = '';
  const secs = seconds % 60;
  const mins = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(seconds / 3600);

  function addLeadingZeroes(time: number) {
    return time < 10 ? `0${time}` : time;
  }
  if (hours > 0) {
    output += `${hours}:`;
  }
  output += `${mins}:${addLeadingZeroes(secs)}`;

  return output;
}

export default function GameBoard({ gameConfigData }: GameBoardProps) {
  const [numOfMoves, setNumOfMoves] = useState<number>(0);
  const [gameSeconds, setGameSeconds] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameEnded) {
        clearInterval(interval);
        setOpen(true);
      } else {
        setGameSeconds((prevGameSeconds) => {
          return (prevGameSeconds += 1);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameEnded]);

  return (
    <>
      <Container maxWidth='lg' sx={GameBoardContainerStyles}>
        <Box component='header' sx={HeaderStyles}>
          <Logo />
          <GameButtonPrimary sx={{ ...ButtonStyles, ...HeaderButtonStyles }}>Restart</GameButtonPrimary>
          <GameButtonSecondary sx={ButtonStyles}>New Game</GameButtonSecondary>
        </Box>
        <MainArea gameConfigData={gameConfigData} setNumOfMoves={setNumOfMoves} setGameEnded={setGameEnded} />
        <Box component='footer' sx={FooterStyles}>
          <Box maxWidth={255} width='100%'>
            <InfoBlock label='Time' value={convertTime(gameSeconds)} />
          </Box>
          <Box maxWidth={255} width='100%'>
            <InfoBlock label='Moves' value={numOfMoves} />
          </Box>
        </Box>
      </Container>
      <Modal open={open} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={ModalStyles}>
          <Box>
            <Typography id='modal-modal-title' textAlign='center' variant='h1' component='h2' sx={{ color: 'primary.dark' }}>
              You did it!
            </Typography>
            <Typography variant='body1' textAlign='center' id='modal-modal-description' mt={3}>
              Game over! Here's how you got on…
            </Typography>
          </Box>

          <Stack spacing={2}>
            <InfoBlock label='Time Elapsed' value={convertTime(gameSeconds)} />
            <InfoBlock label='Moves Taken' value={`${numOfMoves} Moves`} />
          </Stack>
          <Stack direction='row' spacing={2}>
            <GameButtonPrimary fullWidth sx={{ ...ButtonStyles, fontSize: 20 }}>
              Restart
            </GameButtonPrimary>
            <GameButtonSecondary fullWidth sx={ButtonStyles}>
              Setup New Game
            </GameButtonSecondary>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
