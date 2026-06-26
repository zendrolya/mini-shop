import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Rating,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useProduct } from '../hooks/useProduct';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { product, loading, error } = useProduct(productId);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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

      {product && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
          }}
        >
          <Box
            sx={{
              flex: { md: '0 0 40%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 3,
            }}
          >
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{
                maxWidth: '100%',
                maxHeight: 400,
                objectFit: 'contain',
              }}
            />
          </Box>

          <Box
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label={product.category}
                color="primary"
                variant="outlined"
              />
              {product.brand && (
                <Chip label={product.brand} variant="outlined" />
              )}
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                {product.rating.toFixed(1)} · {product.reviews.length} отзывов
              </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <Typography
                variant="h3"
                color="secondary"
                sx={{ fontWeight: 700 }}
              >
                ${product.price}
              </Typography>
              {product.discountPercentage > 0 && (
                <Chip
                  label={`-${product.discountPercentage}%`}
                  color="success"
                  size="small"
                />
              )}
            </Box>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Наличие: {product.availabilityStatus}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Доставка: {product.shippingInformation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Возврат: {product.returnPolicy}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Вес: {product.weight} г
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{ mt: 2, alignSelf: 'flex-start', px: 4 }}
            >
              В корзину
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
