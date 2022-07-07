import { styled, Button } from '@mui/material';

export default styled(Button)(({ theme }) => ({
  fontSize: 32,
  textTransform: 'none',
  borderRadius: '70px !important',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}));
