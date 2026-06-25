import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CatalogPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}
