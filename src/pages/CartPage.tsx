import { useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../hooks/useCart';
import type { CartItem } from '../types/cart';
import EmptyState from '../components/EmptyState';
import OrderForm from '../components/OrderForm';
import type { OrderFormValues } from '../components/OrderForm';
import OrderConfirmation from '../components/OrderConfirmation';

type Step = 'cart' | 'form' | 'confirmation';

interface OrderSnapshot {
  items: CartItem[];
  totalPrice: number;
  formValues: OrderFormValues;
}

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart();
  const [step, setStep] = useState<Step>('cart');
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(
    null
  );

  const handleFormSubmit = useCallback(
    (values: OrderFormValues) => {
      setOrderSnapshot({ items, totalPrice, formValues: values });
      clearCart();
      setStep('confirmation');
    },
    [items, totalPrice, clearCart]
  );

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Корзина
        </Typography>
        <EmptyState
          title="Ваша корзина пуста"
          description="Добавьте товары из каталога, чтобы оформить заказ"
        />
      </Container>
    );
  }

  if (step === 'confirmation' && orderSnapshot) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <OrderConfirmation
          items={orderSnapshot.items}
          totalPrice={orderSnapshot.totalPrice}
          formValues={orderSnapshot.formValues}
        />
      </Container>
    );
  }

  if (step === 'form') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <OrderForm
          items={items}
          totalPrice={totalPrice}
          onSubmit={handleFormSubmit}
          onBack={() => setStep('cart')}
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
        <Typography variant="h2">Корзина</Typography>
        <Button
          color="secondary"
          size="small"
          onClick={clearCart}
          sx={{ textTransform: 'none' }}
        >
          Очистить
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => (
          <Box
            key={item.product.id}
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
                to={`/product/${item.product.id}`}
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
                  src={item.product.thumbnail}
                  alt={item.product.title}
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
                  to={`/product/${item.product.id}`}
                  noWrap
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': { color: 'secondary.main' },
                  }}
                >
                  {item.product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.product.price} за шт.
                </Typography>
              </Box>

              <IconButton
                color="secondary"
                aria-label="Удалить из корзины"
                onClick={() => removeItem(item.product.id)}
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
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <TextField
                  size="small"
                  value={item.quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      const clamped = Math.max(1, Math.min(val, 999));
                      updateQuantity(item.product.id, clamped);
                    }
                  }}
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
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  disabled={item.quantity >= 999}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, minWidth: 80, textAlign: 'right' }}
              >
                ${(item.product.price * item.quantity).toFixed(2)}
              </Typography>

              <IconButton
                color="secondary"
                aria-label="Удалить из корзины"
                onClick={() => removeItem(item.product.id)}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { sm: 'center' },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Итого: ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<ShoppingCartIcon />}
          onClick={() => setStep('form')}
          sx={{ px: 6 }}
        >
          Оформить заказ
        </Button>
      </Box>
    </Container>
  );
}
