import { Box, Grid } from '@mui/material';
import Circle from './Circle/Circle';

export default function MainArea() {
  return (
    <Box sx={{ maxWidth: 560, margin: '0 auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
        <Grid item xs={2}>
          <Circle />
        </Grid>
      </Grid>
    </Box>
  );
}
