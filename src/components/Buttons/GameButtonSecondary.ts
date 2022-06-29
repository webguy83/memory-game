import { styled, Button } from '@mui/material';

export default styled(Button)(({ theme }) => ({
  fontSize: 20,
  textTransform: 'none',
  backgroundColor: '#DFE7EC',
  color: theme.palette.secondary.dark,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));