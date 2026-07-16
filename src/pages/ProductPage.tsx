import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Alert,
  Rating,
  Chip,
  Button,
  Divider,
  IconButton,
  Skeleton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import { ApiError } from '../services/api';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { product, loading, error, rawError } = useProduct(productId);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const favorite = useMemo(
    () => (product ? isFavorite(product.id) : false),
    [product, isFavorite]
  );

  const errorMessage =
    rawError instanceof ApiError && rawError.status === 404
      ? 'Такого товара не существует'
      : error;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
          }}
        >
          <Skeleton
            variant="rounded"
            sx={{
              flex: { md: '0 0 40%' },
              height: 400,
              borderRadius: 3,
            }}
          />
          <Box
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Skeleton variant="rounded" width={120} height={28} />
            <Skeleton variant="rounded" width="70%" height={40} />
            <Skeleton variant="rounded" width={160} height={24} />
            <Skeleton variant="rounded" width="100%" height={60} />
            <Skeleton variant="rounded" width={140} height={40} />
            <Skeleton variant="rounded" width="80%" height={80} />
            <Skeleton variant="rounded" width={200} height={48} />
          </Box>
        </Box>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
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
              loading="lazy"
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

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                sx={{ px: 4 }}
                onClick={() => {
                  addItem(product);
                  showToast(`${product.title} добавлен в корзину`);
                }}
              >
                В корзину
              </Button>
              <IconButton
                size="large"
                aria-label={
                  favorite ? 'Убрать из избранного' : 'Добавить в избранное'
                }
                onClick={() => {
                  toggleFavorite(product);
                  showToast(
                    favorite
                      ? `${product.title} убран из избранного`
                      : `${product.title} добавлен в избранное`
                  );
                }}
                sx={{
                  color: favorite ? 'secondary.main' : 'text.secondary',
                  border: '1px solid rgba(0,0,0,0.12)',
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'secondary.main',
                    outlineOffset: 2,
                  },
                  '&:hover': { color: 'secondary.main' },
                }}
              >
                {favorite ? (
                  <StarIcon fontSize="large" />
                ) : (
                  <StarBorderIcon fontSize="large" />
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
