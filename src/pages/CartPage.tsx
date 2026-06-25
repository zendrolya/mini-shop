import { Typography, Container } from '@mui/material';

export default function CartPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom>
        Корзина
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Ваша корзина пуста
      </Typography>
    </Container>
  );
}
