import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Typography,
  Rating,
  Button,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { Product } from '../types/product';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addItem(product);
    showToast(`${product.title} добавлен в корзину`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    showToast(
      favorite
        ? `${product.title} убран из избранного`
        : `${product.title} добавлен в избранное`
    );
  };
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:focus-within': {
          outline: '2px solid',
          outlineColor: 'secondary.main',
          outlineOffset: 2,
        },
      }}
    >
      <Box
        component={RouterLink}
        to={`/product/${product.id}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{ height: 200, objectFit: 'contain', p: 2 }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
            {product.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
              value={product.rating}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              {product.rating.toFixed(1)}
            </Typography>
          </Box>
          <Typography variant="h6" color="primary" sx={{ mt: 'auto' }}>
            ${product.price}
          </Typography>
        </CardContent>
      </Box>
      <CardActions
        sx={{
          p: 2,
          pt: 0,
          justifyContent: 'space-between',
          '& .MuiButton-root:focus-visible, & .MuiIconButton-root:focus-visible':
            { outline: 'none' },
        }}
      >
        <IconButton
          size="small"
          aria-label={
            favorite ? 'Убрать из избранного' : 'Добавить в избранное'
          }
          onClick={handleToggleFavorite}
          sx={{
            color: favorite ? 'secondary.main' : 'text.secondary',
            '&:hover': { color: 'secondary.main' },
          }}
        >
          {favorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
}
