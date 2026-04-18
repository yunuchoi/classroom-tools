import { createTheme } from '@mui/material/styles'

export const tokens = {
  primary: '#6B4EEE',
  secondary: '#00B894',
  textPrimary: '#1A1030',
  textSecondary: '#6B5E9B',
  bgPage: '#F4F0FF',
  bgPageGradient: 'linear-gradient(135deg, #F4F0FF 0%, #EAF6FF 100%)',
  bgPaper: '#FFFFFF',
  bgLogoBadge: 'linear-gradient(135deg, #6B4EEE, #00B894)',
  divider: 'rgba(107,78,238,0.12)',
  periodCurrent: 'rgba(107,78,238,0.1)',
  periodNext: 'rgba(0,184,148,0.1)',
  periodIdle: 'rgba(107,78,238,0.03)',
  dotPast: '#CCCCCC',
  dotFuture: '#DDDDDD',
  secondsAccent: '#6B4EEE',
  cardHoverShadow: 'rgba(107,78,238,0.18)',
  cardHoverBorder: 'rgba(107,78,238,0.35)',
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.primary },
    secondary: { main: tokens.secondary },
    background: { default: tokens.bgPage, paper: tokens.bgPaper },
    text: { primary: tokens.textPrimary, secondary: tokens.textSecondary },
    divider: tokens.divider,
  },
  typography: {
    fontFamily: '"A2Gothic", sans-serif',
    fontSize: 16,
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '1.1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: tokens.bgPaper,
          border: `1px solid ${tokens.divider}`,
          boxShadow: '0 2px 16px rgba(107,78,238,0.08)',
        },
      },
    },
  },
})

export default theme
