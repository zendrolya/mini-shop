import { Box, Button, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | 'ellipsis-left' | 'ellipsis-right';

const pageButtonSx = {
  minWidth: { xs: 40, sm: 50 },
  minHeight: { xs: 40, sm: 50 },
  p: { xs: '4px 6px', sm: '8px 24px' },
  fontSize: { xs: '0.8rem', sm: '0.95rem' },
  flexShrink: 0,
} as const;

function buildPageRange(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: PageItem[] = [1];

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) {
    items.push('ellipsis-left');
  }

  for (let i = left; i <= right; i++) {
    items.push(i);
  }

  if (right < total - 1) {
    items.push('ellipsis-right');
  }

  items.push(total);

  return items;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="outlined" disabled sx={pageButtonSx}>
          1
        </Button>
      </Box>
    );
  }

  const isFirst = page === 1;
  const isLast = page === totalPages;

  const pageItems = buildPageRange(page, totalPages);

  return (
    <Box
      component="nav"
      aria-label="Навигация по страницам"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        gap: { xs: 0.25, sm: 0.5 },
        flexWrap: 'nowrap',
      }}
    >
      <Button
        disabled={isFirst}
        aria-label="Первая страница"
        onClick={() => onPageChange(1)}
        sx={{ ...pageButtonSx, display: { xs: 'none', sm: 'inline-flex' } }}
      >
        <FirstPageIcon fontSize="small" />
      </Button>
      <Button
        disabled={isFirst}
        aria-label="Предыдущая страница"
        onClick={() => onPageChange(page - 1)}
        sx={pageButtonSx}
      >
        <ChevronLeftIcon fontSize="small" />
      </Button>
      {pageItems.map((item) => {
        if (item === 'ellipsis-left' || item === 'ellipsis-right') {
          return (
            <Typography
              key={item}
              sx={{
                minWidth: { xs: 12, sm: 24 },
                textAlign: 'center',
                userSelect: 'none',
                flexShrink: 0,
              }}
              aria-hidden
            >
              ...
            </Typography>
          );
        }
        return (
          <Button
            key={item}
            variant={item === page ? 'contained' : 'outlined'}
            aria-current={item === page ? 'page' : undefined}
            aria-label={`Страница ${item}`}
            onClick={() => onPageChange(item)}
            sx={pageButtonSx}
          >
            {item}
          </Button>
        );
      })}
      <Button
        disabled={isLast}
        aria-label="Следующая страница"
        onClick={() => onPageChange(page + 1)}
        sx={pageButtonSx}
      >
        <ChevronRightIcon fontSize="small" />
      </Button>
      <Button
        disabled={isLast}
        aria-label="Последняя страница"
        onClick={() => onPageChange(totalPages)}
        sx={{ ...pageButtonSx, display: { xs: 'none', sm: 'inline-flex' } }}
      >
        <LastPageIcon fontSize="small" />
      </Button>
    </Box>
  );
}
