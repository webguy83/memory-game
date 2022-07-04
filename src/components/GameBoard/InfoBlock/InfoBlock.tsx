import { Box, Typography } from '@mui/material';
import { InfoBlockContainer } from './InfoBlock.styles';

interface InfoBlockProps {
  label: string;
  value: number | string;
}

export default function InfoBlock({ label, value }: InfoBlockProps) {
  return (
    <Box sx={InfoBlockContainer}>
      <Typography variant='body1' fontWeight={400}>
        {label}
      </Typography>
      <Typography
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
