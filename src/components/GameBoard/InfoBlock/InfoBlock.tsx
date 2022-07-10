import { Box, Typography } from '@mui/material';
import { InfoBlockContainer } from './InfoBlock.styles';

interface InfoBlockProps {
  label: string;
  value: string;
  highlight: boolean;
}

export default function InfoBlock({ label, value, highlight }: InfoBlockProps) {
  return (
    <Box className='info-block' sx={(theme) => ({ ...InfoBlockContainer, backgroundColor: highlight ? theme.palette.primary.dark : '#DFE7EC' })} justifyContent='space-between' alignItems='center'>
      <Typography
        className='info-block-label'
        variant='body1'
        fontWeight={400}
        sx={{
          color: !highlight ? 'inherit' : 'secondary.contrastText',
        }}
      >
        {label}
      </Typography>
      <Typography
        className='info-block-value'
        variant='body1'
        fontSize={32}
        sx={{
          color: !highlight ? 'secondary.dark' : 'primary.contrastText',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
