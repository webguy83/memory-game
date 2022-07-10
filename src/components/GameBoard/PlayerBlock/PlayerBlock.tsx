import { Box, Typography } from '@mui/material';
import { convertPlayerName } from '../../../utils';
import { InfoBlockContainer } from '../InfoBlock/InfoBlock.styles';
import { PlayerBlockHighlightStyle } from './PlayerBlock.styles';

interface PlayerBlockProps {
  label: string;
  score: number;
  highlight: boolean;
}

export default function PlayerBlock({ label, score, highlight }: PlayerBlockProps) {
  return (
    <Box
      bgcolor='#DFE7EC'
      className='player-block'
      sx={(theme) => ({
        ...InfoBlockContainer,
        ...(highlight && PlayerBlockHighlightStyle),
        transition: theme.transitions.create(['background-color', 'opacity'], {
          duration: theme.transitions.duration.standard,
        }),
        [theme.breakpoints.down('md')]: {
          py: 1.345,
        },
        [theme.breakpoints.down('sm')]: {
          py: 0.72,
        },
      })}
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent={{ xs: 'flex-start', md: 'space-between' }}
      alignItems={{ xs: 'center', sm: 'flex-start', md: 'center' }}
    >
      <Typography
        className='player-block-label'
        variant='body1'
        fontWeight={400}
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            fontSize: 15,
          },
        })}
      >
        <Box component='span' display={{ xs: 'inline', sm: 'none' }}>
          {label}
        </Box>
        <Box component='span' display={{ xs: 'none', sm: 'inline' }}>
          {convertPlayerName(label)}
        </Box>
      </Typography>
      <Typography
        className='player-block-value'
        variant='body1'
        sx={(theme) => ({
          color: 'secondary.dark',
          fontSize: 32,
          [theme.breakpoints.down('md')]: {
            fontSize: 24,
          },
        })}
      >
        {score}
      </Typography>
    </Box>
  );
}
