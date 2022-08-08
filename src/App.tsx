import React from 'react';
import logo from './logo.svg';
import './App.css';

import themes from './themes';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import Routes from './routes';
import { selectThemeMode } from './store/features/settings/settings.selectors';

function App() {
  // const customization = useSelector<RootState>((state) => state.customization);
  const themeMode = useSelector(selectThemeMode);
  const theme = React.useMemo(
    () => themes(themeMode),
    [themeMode],
  );
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
