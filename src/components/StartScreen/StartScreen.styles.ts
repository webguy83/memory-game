import { SxProps, Theme } from '@mui/material';

export const BackgroundStyles: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.primary.dark,
};

export const ContainerStyles: SxProps<Theme> = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const GroupOfButtonStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4.25,
  mt: 10,
  p: 8,
  backgroundColor: (theme) => theme.palette.background.default,
  borderRadius: 4,
};
