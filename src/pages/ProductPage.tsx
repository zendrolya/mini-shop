import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom>
        Товар #{id}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Скоро здесь будет страница товара...
      </Typography>
    </Container>
  );
}
