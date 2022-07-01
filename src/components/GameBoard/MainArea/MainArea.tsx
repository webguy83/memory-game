import { Box, Grid } from '@mui/material';
import { GridSize } from '../../../enums';
import { GameConfigData } from '../../../interfaces';
import Circle from './Circle/Circle';
import { GridItemStyle } from './MainArea.styles';

interface MainAreaProps {
  gameConfigData: GameConfigData;
}

export default function MainArea({ gameConfigData }: MainAreaProps) {
  const gridSize = gameConfigData.gridSize === GridSize.six ? 6 : 4;

  const generateGridItems = () => {
    let items: JSX.Element[] = [];

    for (let i = 0; i < gridSize * gridSize; i++) {
      items.push(
        <Grid key={i} item xs={12 / gridSize} sx={GridItemStyle}>
          <Circle />
        </Grid>
      );
    }
    return items;
  };
  return (
    <Box maxWidth={545}>
      <Grid container spacing={3}>
        {generateGridItems()}
      </Grid>
    </Box>
  );
}
