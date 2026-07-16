import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Container,
  Box,
  Link,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useColorMode } from '../hooks/useColorMode';

const navLinks = [{ label: 'Каталог', to: '/' }];

const navButtonFocus = {
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'secondary.main',
    outlineOffset: 2,
  },
};

const navButtonHover = {
  '&:hover': {
    backgroundColor: 'rgba(233, 69, 96, 0.06)',
    color: 'secondary.main',
  },
};

export default function Layout() {
  const location = useLocation();
  const { totalCount } = useCart();
  const { totalCount: favoritesCount } = useFavorites();
  const { mode, toggleMode } = useColorMode();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1 }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'inherit',
                mr: { xs: 1, sm: 3 },
                flexShrink: 0,
                borderRadius: 1,
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'secondary.main',
                  outlineOffset: 2,
                },
              }}
            >
              <StorefrontIcon sx={{ fontSize: 28, color: 'secondary.main' }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'primary.main',
                }}
              >
                Mini-shop
              </Typography>
            </Box>

            <Box
              component="nav"
              aria-label="Основная навигация"
              sx={{ display: 'flex', gap: 1, flexGrow: 1 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color:
                      location.pathname === link.to
                        ? 'secondary.main'
                        : 'text.primary',
                    backgroundColor:
                      location.pathname === link.to
                        ? 'rgba(233, 69, 96, 0.08)'
                        : 'transparent',
                    transition: 'all 0.2s',
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'secondary.main',
                      outlineOffset: 2,
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(233, 69, 96, 0.06)',
                      color: 'secondary.main',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>

            <IconButton
              onClick={toggleMode}
              aria-label={
                mode === 'light'
                  ? 'Переключить тёмную тему'
                  : 'Переключить светлую тему'
              }
              sx={{
                color: 'text.primary',
                ...navButtonFocus,
                p: { xs: 0.5, sm: 1 },
                ...navButtonHover,
              }}
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            <IconButton
              component={RouterLink}
              to="/favorites"
              aria-label="Избранное"
              sx={{
                color:
                  location.pathname === '/favorites'
                    ? 'secondary.main'
                    : 'text.primary',
                p: { xs: 0.5, sm: 1 },
                backgroundColor:
                  location.pathname === '/favorites'
                    ? 'rgba(233, 69, 96, 0.08)'
                    : 'transparent',
                ...navButtonFocus,
                ...navButtonHover,
              }}
            >
              <Badge
                badgeContent={favoritesCount}
                color="secondary"
                invisible={favoritesCount === 0}
              >
                <StarIcon />
              </Badge>
            </IconButton>

            <IconButton
              component={RouterLink}
              to="/cart"
              aria-label="Корзина"
              sx={{
                color:
                  location.pathname === '/cart'
                    ? 'secondary.main'
                    : 'text.primary',
                p: { xs: 0.5, sm: 1 },
                backgroundColor:
                  location.pathname === '/cart'
                    ? 'rgba(233, 69, 96, 0.08)'
                    : 'transparent',
                ...navButtonFocus,
                ...navButtonHover,
              }}
            >
              <Badge
                badgeContent={totalCount}
                color="secondary"
                invisible={totalCount === 0}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet key={location.pathname} />
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          mt: 'auto',
          backgroundColor: 'footer.main',
          color: 'footer.text',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StorefrontIcon sx={{ color: 'secondary.main' }} />
              <Typography
                variant="body2"
                sx={{ color: 'inherit', fontWeight: 600 }}
              >
                Mini-shop
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'inherit' }}>
              &copy; {new Date().getFullYear()} Mini-shop. Данные:{' '}
              <Link
                href="https://dummyjson.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'secondary.light', textDecoration: 'none' }}
              >
                DummyJSON
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
