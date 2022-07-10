import { Box, Typography } from '@mui/material';
import { InfoBlockContainer } from './InfoBlock.styles';

interface InfoBlockProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export default function InfoBlock({ label, value }: InfoBlockProps) {
  return (
    <Box className='info-block' sx={InfoBlockContainer} justifyContent='space-between' alignItems='center'>
      <Typography className='info-block-label' variant='body1' fontWeight={400}>
        {label}
      </Typography>
      <Typography
        className='info-block-value'
        variant='body1'
        fontSize={32}
        sx={{
          color: 'secondary.dark',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
