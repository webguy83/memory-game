import { SxProps, Theme } from '@mui/material';

export const GameBoardContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  minHeight: '100vh',
};

export const HeaderStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

export const ButtonStyles = {
  px: 3,
  py: 1,
};

export const HeaderButtonStyles = {
  fontSize: 20,
  ml: 'auto',
  mr: 2,
};
