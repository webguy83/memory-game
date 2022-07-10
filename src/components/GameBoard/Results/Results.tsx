import { Box, Stack, Typography } from '@mui/material';
import { Dispatch, forwardRef, MouseEventHandler, SetStateAction } from 'react';
import { ResultsData } from '../../../interfaces';
import GameButtonPrimary from '../../Buttons/GameButtonPrimary';
import GameButtonSecondary from '../../Buttons/GameButtonSecondary';
import { ButtonStyles, ModalStyles } from '../GameBoard.styles';
import InfoBlock from '../InfoBlock/InfoBlock';
import { ResultsDescriptionStyle, ResultsStackStyle, ResultsTitleStyle } from './Results.styles';

interface ModalContentProps {
  data: ResultsData[];
  restartGameClick: MouseEventHandler<HTMLButtonElement>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  titleText: string;
  descriptionText: string;
}

export default forwardRef<HTMLDivElement, ModalContentProps>((props, _ref) => {
  return (
    <Box
      sx={(theme) => ({
        ...ModalStyles,
        [theme.breakpoints.down('sm')]: {
          p: 3,
          gap: 2.5,
        },
      })}
    >
      <Box>
        <Typography id='modal-results-title' textAlign='center' variant='h1' component='h2' sx={ResultsTitleStyle}>
          {props.titleText}
        </Typography>
        <Typography variant='body1' textAlign='center' id='modal-results-description' sx={ResultsDescriptionStyle}>
          {props.descriptionText}
        </Typography>
      </Box>
      <Stack spacing={{ xs: 1, sm: 2 }} sx={ResultsStackStyle}>
        {props.data.map((dataBlock) => {
          return <InfoBlock key={dataBlock.label} label={dataBlock.label} value={dataBlock.value} highlight={dataBlock.highlight} />;
        })}
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <GameButtonPrimary fullWidth sx={{ ...ButtonStyles, fontSize: 20 }} onClick={props.restartGameClick}>
          Restart
        </GameButtonPrimary>
        <GameButtonSecondary fullWidth sx={ButtonStyles} onClick={() => props.setIsPlaying(false)}>
          Setup New Game
        </GameButtonSecondary>
      </Stack>
    </Box>
  );
});
