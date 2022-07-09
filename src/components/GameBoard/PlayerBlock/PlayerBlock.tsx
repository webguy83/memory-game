import { Box, Typography } from '@mui/material';
import { InfoBlockContainer } from '../InfoBlock/InfoBlock.styles';
import { PlayerBlockHighlightStyle } from './PlayerBlock.styles';

interface PlayerBlockProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export default function PlayerBlock({ label, value, highlight }: PlayerBlockProps) {
  return (
    <Box
      className='player-block'
      sx={{
        ...InfoBlockContainer,
        ...(highlight && PlayerBlockHighlightStyle),
      }}
    >
      <Typography className='player-block-label' variant='body1' fontWeight={400}>
        {label}
      </Typography>
      <Typography
        className='player-block-value'
        variant='body1'
        sx={(theme) => ({
          color: theme.palette.secondary.dark,
          fontSize: 32,
        })}
      >
        {value}
      </Typography>
    </Box>
  );
}
