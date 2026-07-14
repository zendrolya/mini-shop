import { useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import EmptyState from '../components/EmptyState';

export default function FavoritesPage() {
  const { items, removeFavorite, clearFavorites } = useFavorites();
  const { addItem, items: cartItems, updateQuantity } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const getQuantity = useCallback(
    (productId: number) => quantities[productId] ?? 1,
    [quantities]
  );

  const handleQuantityChange = useCallback(
    (productId: number, value: string) => {
      const val = parseInt(value, 10);
      if (!isNaN(val)) {
        const clamped = Math.max(1, Math.min(val, 999));
        setQuantities((prev) => ({ ...prev, [productId]: clamped }));
      }
    },
    []
  );

  const incrementQuantity = useCallback((productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.min((prev[productId] ?? 1) + 1, 999),
    }));
  }, []);

  const decrementQuantity = useCallback((productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] ?? 1) - 1, 1),
    }));
  }, []);

  const handleAddToCart = useCallback(
    (productId: number) => {
      const product = items.find((i) => i.id === productId);
      if (!product) return;
      const qty = getQuantity(productId);
      const existingCartItem = cartItems.find(
        (i) => i.product.id === productId
      );
      if (existingCartItem) {
        updateQuantity(productId, existingCartItem.quantity + qty);
      } else {
        for (let i = 0; i < qty; i++) {
          addItem(product);
        }
      }
    },
    [items, cartItems, getQuantity, addItem, updateQuantity]
  );

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Избранное
        </Typography>
        <EmptyState
          title="Избранное пусто"
          description="Добавьте товары из каталога, нажав на звёздочку"
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h2">Избранное</Typography>
        <Button
          color="secondary"
          size="small"
          onClick={clearFavorites}
          sx={{ textTransform: 'none' }}
        >
          Очистить
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: { xs: 1.5, sm: 2 },
              p: 2,
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              backgroundColor: 'background.paper',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexGrow: 1,
                minWidth: 0,
              }}
            >
              <Box
                component={RouterLink}
                to={`/product/${product.id}`}
                sx={{
                  flexShrink: 0,
                  borderRadius: 2,
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'secondary.main',
                    outlineOffset: 2,
                  },
                }}
              >
                <Box
                  component="img"
                  src={product.thumbnail}
                  alt={product.title}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'contain',
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}
                />
              </Box>

              <Box sx={{ flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
                <Typography
                  variant="subtitle1"
                  component={RouterLink}
                  to={`/product/${product.id}`}
                  noWrap
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': { color: 'secondary.main' },
                  }}
                >
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price} за шт.
                </Typography>
              </Box>

              <IconButton
                color="secondary"
                aria-label="Удалить из избранного"
                onClick={() => removeFavorite(product.id)}
                sx={{ display: { xs: 'flex', sm: 'none' }, flexShrink: 0 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: { xs: 'space-between', sm: 'flex-end' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton
                  size="small"
                  aria-label="Уменьшить количество"
                  onClick={() => decrementQuantity(product.id)}
                  disabled={getQuantity(product.id) <= 1}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <TextField
                  size="small"
                  value={getQuantity(product.id)}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                  slotProps={{
                    input: {
                      inputProps: {
                        min: 1,
                        style: { textAlign: 'center', width: 40 },
                      },
                    },
                  }}
                  sx={{ width: 60 }}
                />
                <IconButton
                  size="small"
                  aria-label="Увеличить количество"
                  onClick={() => incrementQuantity(product.id)}
                  disabled={getQuantity(product.id) >= 999}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<ShoppingCartIcon />}
                onClick={() => handleAddToCart(product.id)}
              >
                В корзину
              </Button>

              <IconButton
                color="secondary"
                aria-label="Удалить из избранного"
                onClick={() => removeFavorite(product.id)}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
