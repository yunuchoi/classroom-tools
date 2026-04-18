import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import type { ReactNode } from 'react';
import { tokens } from '../theme';

interface ToolCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const ToolCard = ({ icon, title, description, color, onClick }: ToolCardProps) => (
  <Card
    sx={{
      height: '100%',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        boxShadow: `0 6px 20px ${tokens.cardHoverShadow}`,
        borderColor: tokens.cardHoverBorder,
      },
    }}
  >
    <CardActionArea disableRipple onClick={onClick} sx={{ height: '100%', p: 1 }}>
      <CardContent sx={{ textAlign: 'center', py: 4, px: 3 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `${color}22`,
            color,
            mb: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom color="text.primary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={2}>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default ToolCard;
