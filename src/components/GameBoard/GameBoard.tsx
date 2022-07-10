import { Box, Modal, Container, Stack } from '@mui/material';
import GameButtonSecondary from '../Buttons/GameButtonSecondary';
import GameButtonPrimary from '../Buttons/GameButtonPrimary';
import Logo from '../Logo/Logo';
import { ButtonStyles, FooterStyles, GameBoardContainerStyles, HeaderButtonStyles, HeaderStyles, InfoBlockContainerStyles, ModalStyles, applyTriangleStyles } from './GameBoard.styles';
import PlayingArea from './PlayingArea/PlayingArea';
import { GameConfigData, GamePlayerStat } from '../../interfaces';
import InfoBlock from './InfoBlock/InfoBlock';
import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useEffect, useState } from 'react';
import { convertTime } from '../../utils';
import Results from './Results/Results';
import PlayerBlock from './PlayerBlock/PlayerBlock';

interface GameBoardProps {
  gameConfigData: GameConfigData;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  isMultiPlayer: boolean;
}

export default function GameBoard({ gameConfigData, setIsPlaying, isMultiPlayer }: GameBoardProps) {
  const [numOfMoves, setNumOfMoves] = useState<number>(0);
  const [gameSeconds, setGameSeconds] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [openResultsModal, setOpenResultsModal] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [resetCircles, setResetCircles] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [gameStats, setGameStats] = useState<GamePlayerStat[]>([]);

  const setCallbackGameStats = useCallback((gamePlayerStats: GamePlayerStat[]) => {
    setGameStats(gamePlayerStats);
  }, []);

  const resetGameStats = useCallback(() => {
    const numOfPlayers = gameConfigData.numOfPlayers;
    if (isMultiPlayer) {
      const gamePlayerStats: GamePlayerStat[] = Array.from(Array(numOfPlayers).keys()).map((index) => {
        return {
          name: `P${index + 1}`,
          score: 0,
          currentPlayer: false,
        };
      });
      gamePlayerStats[0].currentPlayer = true;
      setGameStats(gamePlayerStats);
    }
  }, [gameConfigData.numOfPlayers, isMultiPlayer]);

  useEffect(() => {
    resetGameStats();
  }, [resetGameStats]);

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
    resetGameStats();
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
    return gameStats.map((gamePlayerStat) => {
      return (
        <Box key={gamePlayerStat.name} maxWidth={255} width='100%' sx={(theme) => ({ ...(gamePlayerStat.currentPlayer && applyTriangleStyles(theme)) })}>
          <PlayerBlock highlight={gamePlayerStat.currentPlayer} label={gamePlayerStat.name} score={gamePlayerStat.score} />
        </Box>
      );
    });
  };

  return (
    <>
      <Container maxWidth='lg' sx={GameBoardContainerStyles}>
        <Box component='header' sx={HeaderStyles}>
          <Logo />
          <Box component='span' display={{ xs: 'none', sm: 'inline' }}>
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
        <PlayingArea
          setResetCircles={setResetCircles}
          resetCircles={resetCircles}
          gameConfigData={gameConfigData}
          setNumOfMoves={setNumOfMoves}
          setGameEnded={setGameEnded}
          setGameStats={setCallbackGameStats}
          gameStats={gameStats}
          isMultiPlayer={isMultiPlayer}
        />
        <Box component='footer' sx={FooterStyles}>
          {!isMultiPlayer ? (
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
