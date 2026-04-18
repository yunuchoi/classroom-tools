import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours < 12 ? '오전' : '오후';
  hours = hours % 12 || 12;
  return { ampm, time: `${hours}:${minutes}` };
};

const formatDate = (date: Date) => {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${days[date.getDay()]}`;
};

interface SlideValueProps {
  value: string;
  textSx: object;
}

const SlideValue = ({ value, textSx }: SlideValueProps) => {
  const [curr, setCurr] = useState(value);
  const [prev, setPrev] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (value === curr) return;
    clearTimeout(timerRef.current);
    setPrev(curr);
    setCurr(value);
    timerRef.current = setTimeout(() => setPrev(null), 280);
    return () => clearTimeout(timerRef.current);
  }, [value, curr]);

  const sharedPos = { position: 'absolute' as const, top: 0, left: 0, width: '100%' };

  return (
    <Box sx={{ overflow: 'hidden', position: 'relative', display: 'inline-block' }}>
      {/* Invisible spacer keeps container sized to current value */}
      <Box sx={{ ...textSx, visibility: 'hidden' }}>{curr}</Box>

      {prev !== null && (
        <Box
          sx={{
            ...textSx,
            ...sharedPos,
            animation: 'pushOut 0.28s cubic-bezier(0.4, 0, 1, 1) forwards',
            '@keyframes pushOut': {
              from: { transform: 'translateY(0%)' },
              to: { transform: 'translateY(-110%)' },
            },
          }}
        >
          {prev}
        </Box>
      )}

      <Box
        sx={{
          ...textSx,
          ...sharedPos,
          ...(prev !== null
            ? {
                animation: 'pushIn 0.28s cubic-bezier(0, 0, 0.2, 1) forwards',
                '@keyframes pushIn': {
                  from: { transform: 'translateY(110%)' },
                  to: { transform: 'translateY(0%)' },
                },
              }
            : { transform: 'translateY(0%)' }),
        }}
      >
        {curr}
      </Box>
    </Box>
  );
};

const parseOverride = (hhmm: string): Date => {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
};

interface DigitalClockProps {
  overrideTime?: string;
}

const DigitalClock = ({ overrideTime }: DigitalClockProps) => {
  const [now, setNow] = useState(() => overrideTime ? parseOverride(overrideTime) : new Date());

  useEffect(() => {
    if (overrideTime) {
      setNow(parseOverride(overrideTime));
      return;
    }
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [overrideTime]);

  const { ampm, time } = formatTime(now);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ color: 'text.secondary', letterSpacing: 4, mb: 0.5, fontSize: '2rem' }}
      >
        {ampm}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <SlideValue
          value={time}
          textSx={{
            fontSize: 'clamp(104px, 14vw, 188px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-2px',
            color: 'text.primary',
            fontVariantNumeric: 'tabular-nums',
          }}
        />
      </Box>

      <Typography
        variant="h6"
        sx={{ color: 'text.secondary', mt: 2, fontSize: '1.75rem', letterSpacing: 1 }}
      >
        {formatDate(now)}
      </Typography>
    </Box>
  );
};

export default DigitalClock;
