import { Box, Grid } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { GameConfigData, GamePlayerStat, Item } from '../../../interfaces';
import { createIcons, createNumbers, shuffleItems } from '../../../utils';
import CircleToggleButton from './CircleToggleButton/CircleToggleButton';
import { GridContainerStyles, GridItemStyle } from './PlayingArea.styles';

interface PlayingAreaProps {
  gameConfigData: GameConfigData;
  setNumOfMoves: Dispatch<SetStateAction<number>>;
  setGameEnded: Dispatch<SetStateAction<boolean>>;
  resetCircles: boolean;
  setResetCircles: Dispatch<SetStateAction<boolean>>;
  setGameStats: (gamePlayerStats: GamePlayerStat[]) => void;
  gameStats: GamePlayerStat[];
  isMultiPlayer: boolean;
}

export default function PlayingArea({ gameConfigData, setNumOfMoves, setGameEnded, resetCircles, setResetCircles, setGameStats, gameStats, isMultiPlayer }: PlayingAreaProps) {
  const gridSizeNum = gameConfigData.gridSize === '6x6' ? 6 : 4;
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [preventGamePlay, setPreventGamePlay] = useState<boolean>(false);

  useEffect(() => {
    if (resetCircles) {
      const mappedAllItems = allItems.map((item) => {
        item.hasAlreadyBeenMatch = false;
        return item;
      });
      setAllItems(mappedAllItems);
    }
  }, [resetCircles, allItems]);

  useEffect(() => {
    const themeItems = [];
    if (gameConfigData.gameTheme === 'Numbers') {
      themeItems.push(...createNumbers((gridSizeNum * gridSizeNum) / 2), ...createNumbers((gridSizeNum * gridSizeNum) / 2));
    } else {
      const icons = createIcons((gridSizeNum * gridSizeNum) / 2);
      themeItems.push(...icons, ...icons);
    }

    const randomizeItems = shuffleItems(themeItems);
    setAllItems(randomizeItems);
  }, [gameConfigData.gameTheme, gridSizeNum, resetCircles]);

  const goToNextPlayer = useCallback(
    (stats: GamePlayerStat[], numOfPlayers: number) => {
      const modifiedStats = [...stats];
      const currentPlayerIndex = modifiedStats.findIndex((stat) => stat.currentPlayer);
      modifiedStats[currentPlayerIndex].currentPlayer = false;
      if (currentPlayerIndex + 1 >= numOfPlayers) {
        modifiedStats[0].currentPlayer = true;
      } else {
        modifiedStats[currentPlayerIndex + 1].currentPlayer = true;
      }
      setGameStats(modifiedStats);
    },
    [setGameStats]
  );

  const adjustSelectedItems = useCallback(
    (firstItem: Item, secondItem: Item) => {
      if (firstItem.value === secondItem.value) {
        firstItem.hasAlreadyBeenMatch = true;
        secondItem.hasAlreadyBeenMatch = true;
        if (isMultiPlayer) {
          const stats = [...gameStats];
          const currentPlayer = stats.find((stat) => stat.currentPlayer);
          currentPlayer!.score++;
          const adjustedStats = stats.map((stat) => {
            if (currentPlayer?.name === stat.name) {
              return currentPlayer;
            }
            return stat;
          });
          setGameStats(adjustedStats);
        }
      } else {
        if (isMultiPlayer) {
          goToNextPlayer(gameStats, gameConfigData.numOfPlayers);
        }
      }
      firstItem.selected = false;
      secondItem.selected = false;
    },
    [gameConfigData.numOfPlayers, gameStats, goToNextPlayer, isMultiPlayer, setGameStats]
  );

  const gameWon = useCallback(
    (timer: NodeJS.Timeout) => {
      clearTimeout(timer);
      setGameEnded(true);
    },
    [setGameEnded]
  );

  const applyAllNewItems = useCallback(
    (firstItem: Item, secondItem: Item, timer: NodeJS.Timeout) => {
      const newAllItems = allItems.map((item) => {
        if (item.index === firstItem.index) {
          return firstItem;
        } else if (item.index === secondItem.index) {
          return secondItem;
        } else {
          return item;
        }
      });

      setAllItems(newAllItems);
      setPreventGamePlay(false);

      const everythingBeenMatched = newAllItems.every((item) => item.hasAlreadyBeenMatch);
      if (everythingBeenMatched) {
        gameWon(timer);
      }
    },
    [allItems, gameWon]
  );

  const incrementMoves = useCallback(() => {
    if (!isMultiPlayer) {
      setNumOfMoves((prevNumberOfMoves) => {
        return (prevNumberOfMoves += 1);
      });
    }
  }, [isMultiPlayer, setNumOfMoves]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const filteredItemsBySelected = allItems.filter((item) => item.selected);
    setResetCircles(false);
    if (filteredItemsBySelected.length === 2) {
      incrementMoves();
      setPreventGamePlay(true);
      timer = setTimeout(() => {
        const firstItemSelected = filteredItemsBySelected[0];
        const secondItemSelected = filteredItemsBySelected[1];
        adjustSelectedItems(firstItemSelected, secondItemSelected);
        applyAllNewItems(firstItemSelected, secondItemSelected, timer);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [adjustSelectedItems, allItems, applyAllNewItems, incrementMoves, setResetCircles]);

  const generateGridItems = () => {
    return allItems.map((item) => {
      return (
        <Grid
          key={item.index}
          item
          xs={12 / gridSizeNum}
          sx={(theme) => ({
            ...GridItemStyle,
            fontSize: gridSizeNum === 4 ? 56 : 44,
            [theme.breakpoints.down('sm')]: {
              fontSize: gridSizeNum === 4 ? 40 : 24,
            },
          })}
        >
          <CircleToggleButton setAllItems={setAllItems} preventGamePlay={preventGamePlay} content={item} />
        </Grid>
      );
    });
  };
  return (
    <Box maxWidth={520}>
      <Grid sx={GridContainerStyles} container spacing={2}>
        {generateGridItems()}
      </Grid>
    </Box>
  );
}
