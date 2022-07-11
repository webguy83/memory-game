import { Box, styled, ToggleButton } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Item } from '../../../../interfaces';

const CircleToggleButton = styled(ToggleButton)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: '50%',
  lineHeight: 1,
  aspectRatio: '1/1',
  fontSize: 'inherit',
  padding: 0,
  transition: theme.transitions.create(['background-color', 'opacity'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    opacity: 1,
  },
}));

interface CircleToggleButtonProps {
  content: Item;
  setAllItems: Dispatch<SetStateAction<Item[]>>;
  preventGamePlay: boolean;
}

export default function CircleToggleButtonContainer({ content, setAllItems, preventGamePlay }: CircleToggleButtonProps) {
  return (
    <CircleToggleButton
      sx={(theme) => ({
        '&.Mui-selected, &.Mui-selected:hover': {
          cursor: 'default',
          backgroundColor: content.hasAlreadyBeenMatch ? theme.palette.secondary.light : theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        '&:hover': {
          backgroundColor: !preventGamePlay ? theme.palette.secondary.main : theme.palette.secondary.dark,
          cursor: !preventGamePlay ? 'pointer' : 'default',
        },
        '@media (hover: none)': {
          '&:hover': {
            backgroundColor: 'secondary.dark',
          },
        },
      })}
      value='check'
      selected={content.selected || content.hasAlreadyBeenMatch}
      onChange={() => {
        if (!content.selected && !content.hasAlreadyBeenMatch && !preventGamePlay) {
          setAllItems((previousSelectedItems) => {
            const mappedVals = previousSelectedItems.map((item) => {
              if (item.index === content.index) {
                item.selected = true;
              }
              return item;
            });
            return mappedVals;
          });
        }
      }}
    >
      <Box
        component='span'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& .MuiSvgIcon-root': {
            width: '40%',
            height: 'auto',
          },
          visibility: content.selected || content.hasAlreadyBeenMatch ? 'visible' : 'hidden',
        }}
      >
        {content.value}
      </Box>
    </CircleToggleButton>
  );
}
