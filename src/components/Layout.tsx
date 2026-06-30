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
import StorefrontIcon from '@mui/icons-material/Storefront';

const navLinks = [{ label: 'Каталог', to: '/' }];

export default function Layout() {
  const location = useLocation();

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
                mr: 3,
              }}
            >
              <StorefrontIcon sx={{ fontSize: 28, color: 'secondary.main' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'primary.main',
                }}
              >
                Mini-shop
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
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
              component={RouterLink}
              to="/cart"
              sx={{
                color:
                  location.pathname === '/cart'
                    ? 'secondary.main'
                    : 'text.primary',
                backgroundColor:
                  location.pathname === '/cart'
                    ? 'rgba(233, 69, 96, 0.08)'
                    : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(233, 69, 96, 0.06)',
                  color: 'secondary.main',
                },
              }}
            >
              <Badge badgeContent={0} color="secondary">
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
          backgroundColor: 'primary.main',
          color: 'rgba(255,255,255,0.7)',
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
