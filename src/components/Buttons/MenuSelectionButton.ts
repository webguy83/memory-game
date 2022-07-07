import { styled, ToggleButton } from '@mui/material';

export default styled(ToggleButton)(({ theme }) => ({
  fontSize: 26,
  textTransform: 'none',
  borderRadius: '70px !important',
  paddingTop: 4,
  paddingBottom: 4,
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.primary.contrastText,
  transition: theme.transitions.create(['background-color', 'opacity'], {
    duration: theme.transitions.duration.short,
  }),
  '&.Mui-selected, &.Mui-selected:hover': {
    cursor: 'default',
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.contrastText,
  },
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
  },
}));
