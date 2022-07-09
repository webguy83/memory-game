import { SxProps, Theme } from '@mui/material';

export const GameBoardContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  minHeight: '100vh',
};

export const HeaderStyles: SxProps<Theme> = (theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.down('smalltablet')]: {
    '& .logo-container': {
      width: 92,
      height: 30,
    },
  },
});

export const ButtonStyles = {
  px: 3,
  py: 1,
};

export const HeaderButtonStyles = {
  fontSize: 20,
  mr: 2,
};

export const FooterStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: '10px',
  width: '100%',
};

export const ModalStyles = {
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

export const InfoBlockContainerStyles: SxProps<Theme> = (theme) => ({
  [theme.breakpoints.down('sm')]: {
    '& .info-block': {
      flexDirection: 'column',
      py: 0.8,
      '&-label': {
        fontSize: 15,
      },
      '&-value': {
        fontSize: 24,
      },
    },
  },
});

export const PlayerBlockContainerStyle: SxProps<Theme> = {
  '&::before': {
    content: '""',
    display: 'block',
    width: 0,
    height: 0,
    border: 19,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderBottomColor: 'primary.main',
    mx: 'auto',
  },
};
