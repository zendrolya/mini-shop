import { TextField, MenuItem } from '@mui/material';
import type { SortOption } from '../types/product';

interface SortSelectProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Цена ↑' },
  { value: 'price-desc', label: 'Цена ↓' },
  { value: 'rating-asc', label: 'Рейтинг ↑' },
  { value: 'rating-desc', label: 'Рейтинг ↓' },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <TextField
      select
      size="small"
      label="Сортировка"
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      sx={{ minWidth: 180 }}
    >
      {SORT_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
