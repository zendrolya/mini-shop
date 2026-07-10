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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
      <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
        <IconButton
          size="small"
          onClick={() => toggleFavorite(product)}
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
          onClick={() => addItem(product)}
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
}
