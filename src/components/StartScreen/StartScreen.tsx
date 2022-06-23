import { Box, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Logo from '../Logo/Logo';

export default function StartScreen() {
  return (
    <Container maxWidth='md' sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography variant='h1'>
          <Logo lightColor />
        </Typography>
        <Box width='100%' sx={{ mt: 10, p: 8, backgroundColor: (theme) => theme.palette.background.default, borderRadius: 4 }}>
          <Box>
            <Typography variant='h3'>Select Theme</Typography>
            <ToggleButtonGroup sx={{ mt: 2 }} exclusive aria-label='Select Theme'>
              <ToggleButton sx={{ flex: 1 }} value='numbers' aria-label='numbers'>
                Numbers
              </ToggleButton>
              <ToggleButton sx={{ flex: 1 }} value='icons' aria-label='icons'>
                Icons
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant='h3'>Number of Players</Typography>
            <ToggleButtonGroup sx={{ mt: 2 }} exclusive aria-label='Number of Players'>
              <ToggleButton sx={{ flex: 1 }} value='1' aria-label='1'>
                1
              </ToggleButton>
              <ToggleButton sx={{ flex: 1 }} value='2' aria-label='2'>
                2
              </ToggleButton>
              <ToggleButton sx={{ flex: 1 }} value='3' aria-label='3'>
                3
              </ToggleButton>
              <ToggleButton sx={{ flex: 1 }} value='4' aria-label='4'>
                4
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
