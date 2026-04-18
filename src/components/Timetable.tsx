import { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { tokens } from '../theme';

interface Period {
  id: string;
  name: string;
  start: string;
  end: string;
  isBreak?: boolean;
  isLunch?: boolean;
}

interface TimetableProps {
  content: Record<string, string>;
  overrideTime?: string;
}

const parseOverride = (hhmm: string): Date => {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
};

const PERIODS: Period[] = [
  { id: '1', name: '1교시', start: '10:00', end: '10:40' },
  {
    id: 'break1',
    name: '쉬는 시간',
    start: '10:40',
    end: '10:50',
    isBreak: true,
  },
  { id: '2', name: '2교시', start: '10:50', end: '11:30' },
  {
    id: 'lunch',
    name: '점심시간',
    start: '11:30',
    end: '12:10',
    isLunch: true,
  },
  { id: '3', name: '3교시', start: '12:10', end: '12:50' },
  {
    id: 'break3',
    name: '쉬는 시간',
    start: '12:50',
    end: '13:00',
    isBreak: true,
  },
  { id: '4', name: '4교시', start: '13:00', end: '13:40' },
];

const CLASS_PERIOD_IDS = ['1', '2', '3', '4'];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const getNextPeriodIndex = (now: Date) => {
  const current = now.getHours() * 60 + now.getMinutes();
  return PERIODS.findIndex((p) => toMinutes(p.start) > current);
};

const Timetable = ({ content, overrideTime }: TimetableProps) => {
  const [now, setNow] = useState(() => overrideTime ? parseOverride(overrideTime) : new Date());

  useEffect(() => {
    if (overrideTime) {
      setNow(parseOverride(overrideTime));
      return;
    }
    const id = setInterval(() => setNow(new Date()), 5000);
    return () => clearInterval(id);
  }, [overrideTime]);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nextIdx = getNextPeriodIndex(now);

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight={800}
        mb={2}
        sx={{
          color: 'text.secondary',
          letterSpacing: 3,
          fontSize: '1.2rem',
          textTransform: 'uppercase',
        }}
      >
        오늘의 시간표
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {PERIODS.map((period, idx) => {
          const start = toMinutes(period.start);
          const end = toMinutes(period.end);
          const isCurrent = nowMinutes >= start && nowMinutes < end;
          const isPast = nowMinutes >= end;
          const isNext = idx === nextIdx;
          const periodContent = CLASS_PERIOD_IDS.includes(period.id) ? content[period.id] : '';

          return (
            <Box
              key={period.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 2.5,
                py: period.isBreak ? 1 : 1.8,
                borderRadius: 1,
                border: '1px solid',
                borderColor: isCurrent ? 'primary.main' : isNext ? 'secondary.main' : 'transparent',
                background: isCurrent
                  ? tokens.periodCurrent
                  : isNext
                    ? tokens.periodNext
                    : tokens.periodIdle,
                opacity: isPast ? 0.4 : 1,
                transition: 'all 0.3s',
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: isCurrent
                    ? tokens.primary
                    : isNext
                      ? tokens.secondary
                      : isPast
                        ? tokens.dotPast
                        : tokens.dotFuture,
                }}
              />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography
                    fontWeight={isCurrent || isNext ? 800 : 600}
                    sx={{
                      fontSize: period.isBreak || period.isLunch ? '1.3rem' : '1.55rem',
                      letterSpacing: '-0.2px',
                      color: isCurrent
                        ? 'primary.main'
                        : isNext
                          ? 'secondary.main'
                          : 'text.primary',
                      flexShrink: 0,
                    }}
                  >
                    {period.name}
                  </Typography>
                  {periodContent && (
                    <Typography
                      sx={{
                        fontSize: '1.55rem',
                        color: isCurrent
                          ? tokens.primary
                          : isNext
                            ? tokens.secondary
                            : 'text.secondary',
                        fontWeight: isCurrent || isNext ? 700 : 400,
                        letterSpacing: '-0.2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      : {periodContent}
                    </Typography>
                  )}
                </Box>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: '1.1rem', fontWeight: 500, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.2px' }}
                >
                  {period.start} ~ {period.end}
                </Typography>
              </Box>

              {isCurrent && (
                <Chip
                  label="지금"
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 700, flexShrink: 0 }}
                />
              )}
              {isNext && !isCurrent && (
                <Chip
                  label="다음"
                  size="small"
                  color="secondary"
                  sx={{ fontWeight: 700, flexShrink: 0, color: '#fff' }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Timetable;
