import * as React from 'react';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TGBTLOGO from '../../assets/TGBTLOGO.png';
import { Link } from 'react-router-dom';


const Nnavbar = (user) => {


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showNav, setShowNav] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position={showNav ? 'sticky' : 'static'}
      sx={{
        backgroundColor: '#ffffff',
        top: showNav ? '0' : '-100px',
        zIndex: 999,
      }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          {/* Hamburger menu */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              justifyContent: 'start',
            }}
          >
            <IconButton
              onClick={handleClick}
              color="inherit"
              aria-controls="menu"
              aria-haspopup="true"
            >
              <MenuIcon sx={{ color: '#68944f' }} />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/" style={{ textDecoration: 'none' }}>
                <MenuItem onClick={handleClose}>Home</MenuItem>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <MenuItem onClick={handleClose}>About</MenuItem>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <MenuItem onClick={handleClose}>Contact</MenuItem>
              </Link>
            </Menu>
          </Grid>

          {/* Home, About, and Contact tabs */}
          <Grid item xs={12} sm={4}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button
                    color="inherit"
                    sx={{ color: '#68944f', fontWeight: 'bold' }}
                  >
                    Home
                  </Button>
                </Link>
              </Grid>
              <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                  <Button
                    color="inherit"
                    sx={{ color: '#68944f', fontWeight: 'bold' }}
                  >
                    About
                  </Button>
                </Link>
              </Grid>
              <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <Button
                    color="inherit"
                    sx={{ color: '#68944f', fontWeight: 'bold' }}
                  >
                    Contact
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>

          {/* Logo */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ width: '100%', maxWidth: 200, height: 'auto' }}>
              <a href="/" style={{ display: 'block' }}>
                <img
                  src={TGBTLOGO}
                  alt="Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </a>
            </div>
          </Grid>

          {/* Login and Signup buttons */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  href="/login"
                  sx={{ color: '#white', backgroundColor: '#68944f', fontWeight: 'bold', '&:hover': { backgroundColor: '#2e6b33' } }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  href="/register"
                  sx={{ color: '#white', backgroundColor: '#68944f', fontWeight: 'bold', '&:hover': { backgroundColor: '#2e6b33' } }}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Nnavbar;
