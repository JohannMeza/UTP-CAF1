import { Box, ThemeProvider } from '@mui/material';
import { configTheme } from './shared/theme/theme';
import { IndexRouter } from './shared/router';
import AppbarComponent from './shared/component/appbar/AppbarComponent';

const App = (): React.ReactNode => {
  console.log();
  
  return (
    <ThemeProvider theme={configTheme(configTheme())}>
      <Box component="main">
        <AppbarComponent />
        <IndexRouter />
      </Box>
    </ThemeProvider>
  );
};

export default App;
