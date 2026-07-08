import { Box, Chip } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

function formatSlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}
    >
      <CategoryIcon fontSize="small" color="action" />
      <Chip
        label="Все"
        clickable
        color={selected === '' ? 'primary' : 'default'}
        variant={selected === '' ? 'filled' : 'outlined'}
        onClick={() => onSelect('')}
        size="small"
      />
      {categories.map((slug) => (
        <Chip
          key={slug}
          label={formatSlug(slug)}
          clickable
          color={selected === slug ? 'primary' : 'default'}
          variant={selected === slug ? 'filled' : 'outlined'}
          onClick={() => onSelect(slug)}
          size="small"
        />
      ))}
    </Box>
  );
}
