import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { CartItem } from '../types/cart';

interface OrderFormProps {
  items: CartItem[];
  totalPrice: number;
  onSubmit: (values: OrderFormValues) => void;
  onBack: () => void;
}

export interface OrderFormValues {
  name: string;
  email: string;
  address: string;
  phone: string;
}

const initialValues: OrderFormValues = {
  name: '',
  email: '',
  address: '',
  phone: '',
};

export default function OrderForm({
  items,
  totalPrice,
  onSubmit,
  onBack,
}: OrderFormProps) {
  const [values, setValues] = useState<OrderFormValues>(initialValues);

  const handleChange =
    (field: keyof OrderFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          Назад
        </Button>
        <Typography variant="h2">Оформление заказа</Typography>
      </Box>

      {/* Steps indicator */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip
          label="1. Корзина"
          variant="outlined"
          sx={{ borderColor: 'rgba(0,0,0,0.12)', color: 'text.secondary' }}
        />
        <Chip label="2. Данные" color="secondary" sx={{ fontWeight: 600 }} />
        <Chip
          label="3. Подтверждение"
          variant="outlined"
          sx={{ borderColor: 'rgba(0,0,0,0.12)', color: 'text.secondary' }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 4,
            borderRadius: 3,
            backgroundColor: 'background.paper',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            Данные для доставки
          </Typography>

          <TextField
            label="Имя получателя"
            placeholder="Иван Иванов"
            value={values.name}
            onChange={handleChange('name')}
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <PersonIcon
                    sx={{ mr: 1, color: 'text.secondary' }}
                    fontSize="small"
                  />
                ),
              },
            }}
          />

          <TextField
            label="Email"
            placeholder="ivan@example.com"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <EmailIcon
                    sx={{ mr: 1, color: 'text.secondary' }}
                    fontSize="small"
                  />
                ),
              },
            }}
          />

          <TextField
            label="Адрес доставки"
            placeholder="г. Москва, ул. Примерная, д. 1, кв. 10"
            value={values.address}
            onChange={handleChange('address')}
            fullWidth
            required
            multiline
            minRows={2}
            slotProps={{
              input: {
                startAdornment: (
                  <HomeIcon
                    sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }}
                    fontSize="small"
                  />
                ),
              },
            }}
          />

          <TextField
            label="Телефон"
            placeholder="+7 (999) 123-45-67"
            type="tel"
            value={values.phone}
            onChange={handleChange('phone')}
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <PhoneIcon
                    sx={{ mr: 1, color: 'text.secondary' }}
                    fontSize="small"
                  />
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<LocalShippingIcon />}
            sx={{ mt: 1, px: 5, alignSelf: { xs: 'stretch', md: 'flex-end' } }}
          >
            Подтвердить заказ
          </Button>
        </Box>

        {/* Order summary */}
        <Box
          sx={{
            width: { xs: '100%', md: 320 },
            flexShrink: 0,
            p: 3,
            borderRadius: 3,
            backgroundColor: 'background.paper',
            border: '1px solid rgba(0,0,0,0.06)',
            alignSelf: 'flex-start',
            position: { md: 'sticky' },
            top: { md: 100 },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Ваш заказ
          </Typography>

          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}
          >
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
                    width: 44,
                    height: 44,
                    objectFit: 'contain',
                    borderRadius: 1.5,
                    border: '1px solid rgba(0,0,0,0.06)',
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                    {item.product.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.quantity} шт.
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

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Товаров:
              </Typography>
              <Typography
                variant="body2"
                color="success.main"
                sx={{ fontWeight: 500 }}
              >
                {totalItems} шт.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Доставка:
              </Typography>
              <Typography
                variant="body2"
                color="success.main"
                sx={{ fontWeight: 500 }}
              >
                Бесплатно
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
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
    </Box>
  );
}
