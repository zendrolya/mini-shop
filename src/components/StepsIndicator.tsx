import { Box, Chip } from '@mui/material';

const STEPS = ['Корзина', 'Данные', 'Подтверждение'];
const STEP_OUTLINED_SX = {
  borderColor: 'rgba(0,0,0,0.12)',
  color: 'text.secondary',
} as const;

interface StepsIndicatorProps {
  activeStep: number;
}

export default function StepsIndicator({ activeStep }: StepsIndicatorProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {STEPS.map((label, i) => (
        <Chip
          key={label}
          label={`${i + 1}. ${label}`}
          variant={i === activeStep ? 'filled' : 'outlined'}
          color={i === activeStep ? 'secondary' : 'default'}
          sx={i === activeStep ? { fontWeight: 600 } : STEP_OUTLINED_SX}
        />
      ))}
    </Box>
  );
}
