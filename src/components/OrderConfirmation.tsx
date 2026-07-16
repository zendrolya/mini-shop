
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import type { CartItem } from '../types/cart';
import type { OrderFormValues } from './OrderForm';
import StepsIndicator from './StepsIndicator';

interface OrderConfirmationProps {
  items: CartItem[];
  totalPrice: number;
  formValues: OrderFormValues;
}

export default function OrderConfirmation({
  items,
  totalPrice,
  formValues,
}: OrderConfirmationProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <Typography variant="h2">Оформление заказа</Typography>

      {/* Steps indicator */}
      <StepsIndicator activeStep={2} />

      {/* Success message */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          p: 6,
          borderRadius: 3,
          backgroundColor: 'background.paper',
          border: '1px solid divider',
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main' }} />
        <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center' }}>
          Заказ успешно оформлен!
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', maxWidth: 500 }}
        >
          Спасибо за покупку, {formValues.name}! Мы отправим подтверждение на{' '}
          {formValues.email}.
        </Typography>
      </Box>

      {/* Order details */}
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: 'background.paper',
          border: '1px solid divider',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Детали заказа
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {items.map((item) => (
            <Box
              key={item.product.id}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
            >
              <Box
                component="img"
                src={item.product.thumbnail}
                alt={item.product.title}
                sx={{
                  width: 48,
                  height: 48,
                  objectFit: 'contain',
                  borderRadius: 1.5,
                  border: '1px solid divider',
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                  {item.product.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.quantity} шт. × ${item.product.price}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, flexShrink: 0 }}
              >
                ${(item.product.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Товаров:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {totalItems} шт.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Доставка:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Бесплатно
            </Typography>
          </Box>
        </Box>

        <Box sx={{ borderTop: '1px solid divider', pt: 2, mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Итого
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: 'secondary.main' }}
            >
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Shipping info */}
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: 'background.paper',
          border: '1px solid divider',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Данные доставки
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2">
            <strong>Получатель:</strong> {formValues.name}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {formValues.email}
          </Typography>
          <Typography variant="body2">
            <strong>Телефон:</strong> {formValues.phone}
          </Typography>
          <Typography variant="body2">
            <strong>Адрес:</strong> {formValues.address}
          </Typography>
        </Box>
      </Box>

      {/* Back to catalog */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<StorefrontIcon />}
          sx={{ px: 6 }}
        >
          Вернуться в каталог
        </Button>
      </Box>
    </Box>
  );
}
