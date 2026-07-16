import { useState, useCallback, useMemo } from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { CartItem } from '../types/cart';
import StepsIndicator from './StepsIndicator';

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

type FormErrors = Partial<Record<keyof OrderFormValues, string>>;

const initialValues: OrderFormValues = {
  name: '',
  email: '',
  address: '',
  phone: '',
};

function validate(values: OrderFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Введите имя получателя';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа';
  }

  if (!values.email.trim()) {
    errors.email = 'Введите email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Введите корректный email';
  }

  if (!values.address.trim()) {
    errors.address = 'Введите адрес доставки';
  } else if (values.address.trim().length < 10) {
    errors.address = 'Адрес должен содержать минимум 10 символов';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Введите номер телефона';
  } else if (!/^\+?[\d\s\-()]{7,}$/.test(values.phone.trim())) {
    errors.phone = 'Введите корректный номер телефона';
  }

  return errors;
}

export default function OrderForm({
  items,
  totalPrice,
  onSubmit,
  onBack,
}: OrderFormProps) {
  const [values, setValues] = useState<OrderFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    (field: keyof OrderFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        setErrors((prev) => {
          const newValues = { ...values, [field]: value };
          const newErrors = validate(newValues);
          return { ...prev, [field]: newErrors[field] };
        });
      }
    },
    [values, touched]
  );

  const handleBlur = useCallback(
    (field: keyof OrderFormValues) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const newErrors = validate(values);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    },
    [values]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = validate(values);
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        address: true,
        phone: true,
      });
      if (Object.keys(newErrors).length === 0) {
        onSubmit(values);
      }
    },
    [values, onSubmit]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

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
      <StepsIndicator activeStep={1} />

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
          noValidate
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
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            fullWidth
            error={touched.name && !!errors.name}
            helperText={touched.name ? errors.name : ''}
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
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            fullWidth
            error={touched.email && !!errors.email}
            helperText={touched.email ? errors.email : ''}
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
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => handleBlur('address')}
            fullWidth
            multiline
            minRows={2}
            error={touched.address && !!errors.address}
            helperText={touched.address ? errors.address : ''}
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
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            fullWidth
            error={touched.phone && !!errors.phone}
            helperText={touched.phone ? errors.phone : ''}
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
            disabled={Object.keys(validate(values)).length > 0}
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
