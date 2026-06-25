import { Typography, Container } from '@mui/material';

export default function CatalogPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom>
        Каталог товаров
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Скоро здесь будет список товаров...
      </Typography>
    </Container>
  );
}
