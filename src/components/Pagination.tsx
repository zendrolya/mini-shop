import { Box, Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="outlined" disabled>
          1
        </Button>
      </Box>
    );
  }

  const isFirst = page === 1;
  const isLast = page === totalPages;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        gap: 0.5,
      }}
    >
      <Button
        disabled={isFirst}
        onClick={() => onPageChange(1)}
        sx={{ minWidth: 40, minHeight: 40 }}
      >
        <FirstPageIcon />
      </Button>
      <Button
        disabled={isFirst}
        onClick={() => onPageChange(page - 1)}
        sx={{ minWidth: 40, minHeight: 40 }}
      >
        <ChevronLeftIcon />
      </Button>
      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? 'contained' : 'outlined'}
          onClick={() => onPageChange(p)}
          sx={{ minWidth: 40, minHeight: 40 }}
        >
          {p}
        </Button>
      ))}
      <Button
        disabled={isLast}
        onClick={() => onPageChange(page + 1)}
        sx={{ minWidth: 40, minHeight: 40 }}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        disabled={isLast}
        onClick={() => onPageChange(totalPages)}
        sx={{ minWidth: 40, minHeight: 40 }}
      >
        <LastPageIcon />
      </Button>
    </Box>
  );
}
