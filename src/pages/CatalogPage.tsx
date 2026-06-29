import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';

export default function CatalogPage() {
  const { products, loading, error } = useProducts();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom>
        Каталог товаров
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <EmptyState />
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}
