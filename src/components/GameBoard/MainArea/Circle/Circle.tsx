import { Box } from '@mui/material';

export default function Circle() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.dark,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: '1/1',
      }}
    >
      <Box sx={{ fontSize: 44 }}>{Math.floor(Math.random() * 20)}</Box>
    </Box>
  );
}
