import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'Ничего не найдено',
  description = 'Попробуйте изменить параметры поиска или фильтрации',
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 12,
        px: 2,
        textAlign: 'center',
      }}
    >
      <SearchOffIcon
        sx={{ fontSize: 80, color: 'text.secondary', mb: 3, opacity: 0.5 }}
      />
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
        {description}
      </Typography>
    </Box>
  );
}
