import { SxProps, Theme } from '@mui/material';

export const ResultsTitleStyle: SxProps<Theme> = (theme) => ({
  color: 'primary.dark',
  [theme.breakpoints.down('sm')]: {
    fontSize: 24,
  },
});

export const ResultsDescriptionStyle: SxProps<Theme> = (theme) => ({
  mt: 3,
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
    mt: 1,
  },
});

export const ResultsStackStyle: SxProps<Theme> = (theme) => ({
  [theme.breakpoints.down('sm')]: {
    '& .info-block': {
      '&-label': {
        fontSize: 13,
      },
      '&-value': {
        fontSize: 20,
      },
    },
  },
});
