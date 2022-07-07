import { SxProps, Theme } from '@mui/material';

export const BackgroundStyles: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.primary.dark,
};

export const ContainerStyles: SxProps<Theme> = (theme) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    '& .logo-container': {
      width: 122,
    },
  },
});

export const GroupOfButtonStyles: SxProps<Theme> = (theme) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4.25,
  mt: 10,
  p: 8,
  [theme.breakpoints.down('sm')]: {
    p: 3,
  },
  backgroundColor: theme.palette.background.default,
  borderRadius: 4,
});
