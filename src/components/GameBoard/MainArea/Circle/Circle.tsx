import { Box } from '@mui/material';

export default function Circle() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.dark,
        width: 82,
        height: 82,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      4
    </Box>
  );
}
