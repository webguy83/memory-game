import { Box, Typography, ToggleButtonGroup } from '@mui/material';
import { MouseEvent } from 'react';
import MenuSelectionButton from '../../Buttons/MenuSelectionButton';

interface DataGroupProps {
  groupLabel: string;
  groupValue: string;
  buttonValues: string[];
  handleChange: (_evt: MouseEvent<HTMLElement>, newVal: any) => void;
}

export default function DataGroup(props: DataGroupProps) {
  const generateToggleButtons = () => {
    return props.buttonValues.map((buttonVal) => {
      return (
        <MenuSelectionButton
          key={buttonVal}
          sx={(theme) => ({
            flex: 1,
            [theme.breakpoints.down('sm')]: {
              fontSize: 16,
            },
          })}
          value={buttonVal}
          aria-label={buttonVal}
        >
          {buttonVal}
        </MenuSelectionButton>
      );
    });
  };
  return (
    <Box>
      <Typography
        variant='h3'
        sx={(theme) => ({
          [theme.breakpoints.down('sm')]: {
            fontSize: 15,
          },
        })}
      >
        {props.groupLabel}
      </Typography>
      <ToggleButtonGroup
        sx={(theme) => ({
          display: 'flex',
          gap: 3.5,
          [theme.breakpoints.down('sm')]: {
            gap: 1.875,
          },
          mt: 2,
        })}
        exclusive
        aria-label={props.groupLabel}
        onChange={props.handleChange}
        value={props.groupValue}
      >
        {generateToggleButtons()}
      </ToggleButtonGroup>
    </Box>
  );
}
