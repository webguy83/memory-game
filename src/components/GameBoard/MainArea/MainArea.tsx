import { Box, Grid } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GridSize } from '../../../enums';
import { GameConfigData, Item } from '../../../interfaces';
import { createNumbers, shuffleItems } from '../../../utils';
import CircleToggleButton from './CircleToggleButton/CircleToggleButton';
import { GridContainerStyles, GridItemStyle } from './MainArea.styles';

interface MainAreaProps {
  gameConfigData: GameConfigData;
  setNumOfMoves: Dispatch<SetStateAction<number>>;
  setGameEnded: Dispatch<SetStateAction<boolean>>;
}

export default function MainArea({ gameConfigData, setNumOfMoves, setGameEnded }: MainAreaProps) {
  const gridSize = gameConfigData.gridSize === GridSize.six ? 6 : 4;
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [preventGamePlay, setPreventGamePlay] = useState<boolean>(false);

  useEffect(() => {
    const numbers = [...createNumbers((gridSize * gridSize) / 2), ...createNumbers((gridSize * gridSize) / 2)];
    const randomizeItems = shuffleItems(numbers);
    setSelectedItems(randomizeItems);
  }, [gridSize]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const filteredItemsBySelected = selectedItems.filter((item) => item.selected);
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

        // check for game over
        const everythingBeenMatched = newSelectedItems.every((item) => item.hasAlreadyBeenMatch);
        if (everythingBeenMatched) {
          clearTimeout(timer);
          setGameEnded(true);
        }
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [selectedItems, setGameEnded, setNumOfMoves]);

  const generateGridItems = () => {
    return selectedItems.map((item) => {
      return (
        <Grid key={item.index} item xs={12 / gridSize} sx={{ ...GridItemStyle, fontSize: gridSize === 4 ? 56 : 44 }}>
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
