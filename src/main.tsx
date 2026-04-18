import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './fonts.css';
import theme from './theme';
import App from './App';

import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>
);
