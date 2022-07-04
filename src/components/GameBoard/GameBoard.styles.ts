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

export const FooterStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  width: '100%',
};

export const ModalStyles: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  maxWidth: 600,
  minWidth: 360,
  transform: 'translate(-50%, -50%)',
  bgcolor: '#F2F2F2',
  borderRadius: 5,
  p: 7,
};
