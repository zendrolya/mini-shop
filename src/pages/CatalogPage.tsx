import { useCallback, useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Alert,
  Skeleton,
} from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useCategoryProducts } from '../hooks/useCategoryProducts';
import SearchInput from '../components/SearchInput';
import CategoryFilter from '../components/CategoryFilter';
import SortSelect from '../components/SortSelect';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import type { SortOption, Product } from '../types/product';

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  if (sortBy === 'default') return products;

  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-asc':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [page, setPage] = useState(1);

  const { products, total, loading, error } = useProducts(
    searchQuery,
    category,
    page
  );
  const { categories, loading: categoriesLoading } = useCategoryProducts();

  const LIMIT = 20;
  const TOTAL_PAGES = Math.max(1, Math.ceil(total / LIMIT));

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sortedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy]
  );

  const handleCategorySelect = useCallback((slug: string) => {
    setCategory(slug);
    setPage(1);
    if (slug) {
      setSearchQuery('');
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h2">Каталог товаров</Typography>
        <SearchInput onSearch={handleSearch} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {!categoriesLoading && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selected={category}
            onSelect={handleCategorySelect}
          />
        )}
        <SortSelect value={sortBy} onChange={setSortBy} />
      </Box>

      {loading && (
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Skeleton
                variant="rounded"
                height={340}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          {sortedProducts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <Grid container spacing={3}>
                {sortedProducts.map((product) => (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              <Pagination
                page={page}
                totalPages={TOTAL_PAGES}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
}
