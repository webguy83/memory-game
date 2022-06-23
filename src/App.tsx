import StartScreen from './components/StartScreen/StartScreen';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StartScreen />
    </ThemeProvider>
  );
}
