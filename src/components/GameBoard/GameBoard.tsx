import { Box, Modal, Container, Stack, Typography } from '@mui/material';
import GameButtonSecondary from '../Buttons/GameButtonSecondary';
import GameButtonPrimary from '../Buttons/GameButtonPrimary';
import Logo from '../Logo/Logo';
import { ButtonStyles, FooterStyles, GameBoardContainerStyles, HeaderButtonStyles, HeaderStyles, InfoBlockContainerStyles, ModalStyles, applyTriangleStyles } from './GameBoard.styles';
import PlayingArea from './PlayingArea/PlayingArea';
import { GameConfigData, GamePlayerStat, ResultsData } from '../../interfaces';
import InfoBlock from './InfoBlock/InfoBlock';
import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useEffect, useState } from 'react';
import { convertTime, convertPlayerName } from '../../utils';
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
        const name = `P${index + 1}`;
        return {
          name,
          fullName: convertPlayerName(name),
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
    if (!isMultiPlayer) {
      const interval = setInterval(() => {
        if (!gameEnded && !pauseTimer) {
          setGameSeconds((prevGameSeconds) => {
            return (prevGameSeconds += 1);
          });
        }
      }, 1000);
      if (pauseTimer || gameEnded) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [gameEnded, isMultiPlayer, pauseTimer, resetCircles]);

  useEffect(() => {
    if (gameEnded) {
      setOpenResultsModal(true);
    }
  }, [gameEnded]);

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
        <Box key={gamePlayerStat.name} display='flex' flexDirection='column' maxWidth={255} width='100%' sx={(theme) => ({ ...(gamePlayerStat.currentPlayer && applyTriangleStyles(theme)) })}>
          <PlayerBlock highlight={gamePlayerStat.currentPlayer} label={gamePlayerStat.name} score={gamePlayerStat.score} />
          <Typography
            fontSize={13}
            letterSpacing={5}
            mt={2.875}
            textTransform='uppercase'
            textAlign='center'
            display={{ xs: 'none', md: 'inline' }}
            sx={{ visibility: gamePlayerStat.currentPlayer ? 'visible' : 'hidden', color: 'secondary.dark' }}
          >
            Current Turn
          </Typography>
        </Box>
      );
    });
  };

  const sortPlayerScores = (stats: GamePlayerStat[]) => {
    const outputStats = [...stats];
    return outputStats.sort((a, b) => b.score - a.score);
  };

  const renderResults = () => {
    const sortedStats = sortPlayerScores(gameStats);
    const topPlayer = sortedStats[0];
    let amountOfWinners = 0;
    const resultsData: ResultsData[] = sortedStats.map((stat) => {
      const output = {
        label: stat.fullName,
        value: `${stat.score} Pairs`,
        highlight: false,
      };
      if (stat.score === topPlayer.score) {
        amountOfWinners++;
        output.label += ' (Winner!)';
        output.highlight = true;
      }
      return output;
    });
    let titleText = "It's a Tie!";
    if (amountOfWinners < 2) {
      titleText = `${topPlayer.fullName} Wins!`;
    }
    const descriptionText = 'Game over! Here are the results…';

    return <Results restartGameClick={restartGameClick} setIsPlaying={setIsPlaying} titleText={titleText} descriptionText={descriptionText} data={resultsData} />;
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
                <InfoBlock label='Time' value={convertTime(gameSeconds)} highlight={false} />
              </Box>
              <Box maxWidth={255} width='100%' sx={InfoBlockContainerStyles}>
                <InfoBlock label='Moves' value={numOfMoves.toString()} highlight={false} />
              </Box>
            </>
          ) : (
            renderPlayerBlocks()
          )}
        </Box>
      </Container>
      <Modal open={openResultsModal} aria-labelledby='modal-results-title' aria-describedby='modal-results-description'>
        <>
          {!isMultiPlayer && gameEnded && (
            <Results
              restartGameClick={restartGameClick}
              setIsPlaying={setIsPlaying}
              titleText='You did it!'
              descriptionText="Game over! Here's how you got on…"
              data={[
                { label: 'Time Elapsed', value: convertTime(gameSeconds), highlight: false },
                { label: 'Moves Taken', value: `${numOfMoves} Moves`, highlight: false },
              ]}
            />
          )}
          {isMultiPlayer && gameEnded && renderResults()}
        </>
      </Modal>
      <Modal open={openMenuModal} onClose={onMenuModalClose}>
        <Box
          sx={(theme) => ({
            ...ModalStyles,
            p: 4,
            maxWidth: 315,
            minWidth: 280,
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
