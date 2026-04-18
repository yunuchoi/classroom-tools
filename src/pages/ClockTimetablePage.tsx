import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Collapse,
  Grid2 as Grid,
  Divider,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import { Bug, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import DigitalClock from '../components/DigitalClock';
import Timetable from '../components/Timetable';
import { tokens } from '../theme';

const CLASS_PERIODS = [
  { id: '1', label: '1교시', placeholder: '예: 1과 워크북, 받아쓰기' },
  { id: '2', label: '2교시', placeholder: '예: 2과 어휘' },
  { id: '3', label: '3교시', placeholder: '예: 2과 문법' },
  { id: '4', label: '4교시', placeholder: '예: 체육' },
];

const LS_KEY = 'classroom-tools:period-content';

const loadContent = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '{}');
  } catch {
    return {};
  }
};

const ClockTimetablePage = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'setup' | 'display'>('setup');
  const [content, setContent] = useState<Record<string, string>>(loadContent);
  const [debugOpen, setDebugOpen] = useState(false);
  const [debugTime, setDebugTime] = useState('');

  const handleStart = () => {
    localStorage.setItem(LS_KEY, JSON.stringify(content));
    setPhase('display');
  };

  if (phase === 'setup') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: tokens.bgPageGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
        }}
      >
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            position: 'absolute',
            top: 20,
            left: 24,
            color: 'text.secondary',
            '&:hover': {
              color: tokens.primary,
              background: tokens.periodCurrent,
            },
          }}
        >
          <ChevronLeft size={28} />
        </IconButton>

        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 480,
            p: 5,
            borderRadius: 1,
            border: `1px solid ${tokens.divider}`,
          }}
        >
          <Typography variant="h5" fontWeight={800} mb={0.5} color="text.primary">
            오늘의 수업 내용
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            각 교시의 수업 내용을 입력하세요
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {CLASS_PERIODS.map((p) => (
              <Box key={p.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                  fontWeight={700}
                  sx={{
                    minWidth: 56,
                    color: tokens.primary,
                    fontSize: '1rem',
                  }}
                >
                  {p.label}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={p.placeholder}
                  value={content[p.id] ?? ''}
                  onChange={(e) => setContent((prev) => ({ ...prev, [p.id]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleStart();
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      fontFamily: '"A2Gothic", sans-serif',
                    },
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box mt={4}>
            <Button
              size="small"
              variant="text"
              onClick={() => setDebugOpen((o) => !o)}
              startIcon={<Bug size={13} />}
              endIcon={debugOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              sx={{
                color: 'text.disabled',
                fontSize: '0.72rem',
                textTransform: 'none',
                fontWeight: 400,
              }}
            >
              시간 설정 (테스트용)
            </Button>
            <Collapse in={debugOpen}>
              <Box sx={{ pt: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <TextField
                  type="time"
                  size="small"
                  label="현재 시간"
                  value={debugTime}
                  onChange={(e) => setDebugTime(e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ flex: 1 }}
                />
                {debugTime && (
                  <Button size="small" variant="outlined" onClick={() => setDebugTime('')}>
                    초기화
                  </Button>
                )}
              </Box>
            </Collapse>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleStart}
            sx={{
              mt: 4,
              py: 1.5,
              fontSize: '1.1rem',
              background: `linear-gradient(135deg, ${tokens.primary}, #8B74F2)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${tokens.primary}ee, #8B74F2ee)`,
              },
            }}
          >
            수업 시작
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: tokens.bgPageGradient,
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, md: 8 },
        py: 6,
        position: 'relative',
      }}
    >
      <IconButton
        onClick={() => setPhase('setup')}
        sx={{
          position: 'absolute',
          top: 20,
          left: 24,
          color: 'text.secondary',
          '&:hover': {
            color: tokens.primary,
            background: tokens.periodCurrent,
          },
        }}
      >
        <ChevronLeft size={28} />
      </IconButton>
      <Grid container spacing={12} alignItems="center" sx={{ width: '100%' }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <DigitalClock overrideTime={debugTime || undefined} />
        </Grid>

        <Grid size={{ xs: 12, md: 'auto' }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 400, borderColor: tokens.divider }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Timetable content={content} overrideTime={debugTime || undefined} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClockTimetablePage;
