import { Box, Modal, Container, Stack } from '@mui/material';
import GameButtonSecondary from '../Buttons/GameButtonSecondary';
import GameButtonPrimary from '../Buttons/GameButtonPrimary';
import Logo from '../Logo/Logo';
import { ButtonStyles, FooterStyles, GameBoardContainerStyles, HeaderButtonStyles, HeaderStyles, InfoBlockContainerStyles, ModalStyles, PlayerBlockContainerStyle } from './GameBoard.styles';
import PlayingArea from './PlayingArea/PlayingArea';
import { GameConfigData } from '../../interfaces';
import InfoBlock from './InfoBlock/InfoBlock';
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import { convertTime } from '../../utils';
import Results from './Results/Results';
import PlayerBlock from './PlayerBlock/PlayerBlock';

interface GameBoardProps {
  gameConfigData: GameConfigData;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

interface GameScore {
  [k: string]: number;
}

export default function GameBoard({ gameConfigData, setIsPlaying }: GameBoardProps) {
  const [numOfMoves, setNumOfMoves] = useState<number>(0);
  const [gameSeconds, setGameSeconds] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [openResultsModal, setOpenResultsModal] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [resetCircles, setResetCircles] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameScore, setGameScore] = useState<GameScore>({});

  useEffect(() => {
    const players = gameConfigData.numOfPlayers;
    if (players > 1) {
      const initScoreTable = Array.from(Array(players).keys())
        .map((player) => (player += 1))
        .reduce<GameScore>((scoreObj, num) => {
          scoreObj[`p${num}`] = 0;
          return scoreObj;
        }, {});
      setGameScore(initScoreTable);
    }
  }, [gameConfigData.numOfPlayers]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameEnded && !pauseTimer) {
        setGameSeconds((prevGameSeconds) => {
          return (prevGameSeconds += 1);
        });
      }
    }, 1000);
    if (gameEnded) {
      clearInterval(interval);
      setOpenResultsModal(true);
    }
    if (pauseTimer) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameEnded, pauseTimer, resetCircles]);

  const restartGameClick: MouseEventHandler<HTMLButtonElement> = () => {
    setNumOfMoves(0);
    setGameSeconds(0);
    setGameEnded(false);
    setOpenResultsModal(false);
    setOpenMenuModal(false);
    setResetCircles(true);
    setPauseTimer(false);
  };

  const onMenuButtonClick = () => {
    setOpenMenuModal(true);
    setPauseTimer(true);
  };

  const onMenuModalClose = () => {
    setOpenMenuModal(false);
    setPauseTimer(false);
  };

  const renderPlayerBlocks = () => {
    return Array.from({ length: gameConfigData.numOfPlayers }).map((_, i) => {
      return (
        <Box key={i} maxWidth={255} width='100%' sx={{ ...(i + 1 === currentPlayer && PlayerBlockContainerStyle) }}>
          <PlayerBlock highlight={i + 1 === currentPlayer} label={`Player ${i + 1}`} value='0' />
        </Box>
      );
    });
  };

  return (
    <>
      <Container maxWidth='lg' sx={GameBoardContainerStyles}>
        <Box component='header' sx={HeaderStyles}>
          <Logo />
          <Box
            component='span'
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                display: 'none',
              },
            })}
          >
            <GameButtonPrimary onClick={restartGameClick} sx={{ ...ButtonStyles, ...HeaderButtonStyles }}>
              Restart
            </GameButtonPrimary>
            <GameButtonSecondary onClick={() => setIsPlaying(false)} sx={ButtonStyles}>
              New Game
            </GameButtonSecondary>
          </Box>
          <GameButtonPrimary
            onClick={onMenuButtonClick}
            sx={(theme) => ({
              ...ButtonStyles,
              ...HeaderButtonStyles,
              fontSize: 16,
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            })}
          >
            Menu
          </GameButtonPrimary>
        </Box>
        <PlayingArea setResetCircles={setResetCircles} resetCircles={resetCircles} gameConfigData={gameConfigData} setNumOfMoves={setNumOfMoves} setGameEnded={setGameEnded} />
        <Box component='footer' sx={FooterStyles}>
          {gameConfigData.numOfPlayers < 2 ? (
            <>
              <Box maxWidth={255} width='100%' sx={InfoBlockContainerStyles}>
                <InfoBlock label='Time' value={convertTime(gameSeconds)} />
              </Box>
              <Box maxWidth={255} width='100%' sx={InfoBlockContainerStyles}>
                <InfoBlock label='Moves' value={numOfMoves.toString()} />
              </Box>
            </>
          ) : (
            renderPlayerBlocks()
          )}
        </Box>
      </Container>
      <Modal open={openResultsModal} aria-labelledby='modal-results-title' aria-describedby='modal-results-description'>
        <Results
          restartGameClick={restartGameClick}
          setIsPlaying={setIsPlaying}
          data={[
            { label: 'Time Elapsed', value: convertTime(gameSeconds) },
            { label: 'Moves Taken', value: `${numOfMoves} Moves` },
          ]}
        />
      </Modal>
      <Modal open={openMenuModal} onClose={onMenuModalClose}>
        <Box
          sx={(theme) => ({
            ...ModalStyles,
            p: 4,
            maxWidth: 360,
            minWidth: 'auto',
            [theme.breakpoints.down('sm')]: {
              p: 3,
            },
          })}
        >
          <Stack spacing={2}>
            <GameButtonPrimary onClick={restartGameClick} sx={{ ...ButtonStyles, fontSize: 18 }}>
              Restart
            </GameButtonPrimary>
            <GameButtonSecondary onClick={() => setIsPlaying(false)} sx={{ ...ButtonStyles, fontSize: 18 }}>
              New Game
            </GameButtonSecondary>
            <GameButtonSecondary onClick={onMenuModalClose} sx={{ ...ButtonStyles, fontSize: 18 }}>
              Resume Game
            </GameButtonSecondary>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
