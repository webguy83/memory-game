import { Box, Grid } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GameConfigData, Item } from '../../../interfaces';
import { createIcons, createNumbers, shuffleItems } from '../../../utils';
import CircleToggleButton from './CircleToggleButton/CircleToggleButton';
import { GridContainerStyles, GridItemStyle } from './PlayingArea.styles';

interface PlayingAreaProps {
  gameConfigData: GameConfigData;
  setNumOfMoves: Dispatch<SetStateAction<number>>;
  setGameEnded: Dispatch<SetStateAction<boolean>>;
  resetCircles: boolean;
  setResetCircles: Dispatch<SetStateAction<boolean>>;
}

export default function PlayingArea({ gameConfigData, setNumOfMoves, setGameEnded, resetCircles, setResetCircles }: PlayingAreaProps) {
  const gridSizeNum = gameConfigData.gridSize === '6x6' ? 6 : 4;
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [preventGamePlay, setPreventGamePlay] = useState<boolean>(false);

  useEffect(() => {
    if (resetCircles) {
      const mappedSelectedItems = selectedItems.map((item) => {
        item.hasAlreadyBeenMatch = false;
        return item;
      });
      setSelectedItems(mappedSelectedItems);
    }
  }, [resetCircles, selectedItems]);

  useEffect(() => {
    const themeItems = [];
    if (gameConfigData.gameTheme === 'Numbers') {
      themeItems.push(...createNumbers((gridSizeNum * gridSizeNum) / 2), ...createNumbers((gridSizeNum * gridSizeNum) / 2));
    } else {
      const icons = createIcons((gridSizeNum * gridSizeNum) / 2);
      themeItems.push(...icons, ...icons);
    }

    const randomizeItems = shuffleItems(themeItems);
    setSelectedItems(randomizeItems);
  }, [gameConfigData.gameTheme, gridSizeNum, resetCircles]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const filteredItemsBySelected = selectedItems.filter((item) => item.selected);
    setResetCircles(false);
    if (filteredItemsBySelected.length === 2) {
      setNumOfMoves((prevNumberOfMoves) => {
        return (prevNumberOfMoves += 1);
      });
      setPreventGamePlay(true);
      timer = setTimeout(() => {
        const newSelectedItems = selectedItems.map((item) => {
          if (filteredItemsBySelected[0].value === filteredItemsBySelected[1].value) {
            if (item.value === filteredItemsBySelected[0].value || item.value === filteredItemsBySelected[1].value) {
              item.hasAlreadyBeenMatch = true;
            }
          }
          item.selected = false;
          return item;
        });

        setSelectedItems(newSelectedItems);
        setPreventGamePlay(false);

        const everythingBeenMatched = newSelectedItems.every((item) => item.hasAlreadyBeenMatch);
        if (everythingBeenMatched) {
          clearTimeout(timer);
          setGameEnded(true);
        }
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [selectedItems, setGameEnded, setNumOfMoves, setResetCircles]);

  const generateGridItems = () => {
    return selectedItems.map((item) => {
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
          <CircleToggleButton setSelectedItems={setSelectedItems} preventGamePlay={preventGamePlay} content={item} />
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
