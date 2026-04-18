import { Box, Container, Grid2 as Grid } from '@mui/material';
import { Clock } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import { tokens } from '../theme';
import { useNavigate } from 'react-router-dom';

const tools = [
  {
    id: 'clock',
    icon: <Clock size={40} />,
    title: '시계 & 시간표',
    description: '수업 시작 전과 쉬는 시간에 보여주는 시계와 시간표',
    color: tokens.primary,
    path: '/clock-timetable',
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: tokens.bgPageGradient }}>
      {/* Tool grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {tools.map((tool) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tool.id}>
              <ToolCard
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                color={tool.color}
                onClick={() => navigate(tool.path)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
