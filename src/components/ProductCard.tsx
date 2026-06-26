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
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      component={RouterLink}
      to={`/product/${product.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
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
      <CardActions sx={{ p: 2, pt: 0 }} onClick={(e) => e.stopPropagation()}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<ShoppingCartIcon />}
          onClick={(e) => e.preventDefault()}
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
}
