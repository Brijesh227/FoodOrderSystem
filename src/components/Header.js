import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const Header = () => {

  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const loggedInUserDetail = JSON.parse(localStorage.getItem('loggedInUserID'));
    if(loggedInUserDetail?.role === 'admin_user'){
      setIsAdminUser(true);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
      >
        <Toolbar sx={{ ml: '160px' }}>
          <Typography variant="h6" component="div" sx={{ display: 'flex',flexGrow:10 }}>
            Food Order System
          </Typography>
          {isAdminUser && <Button component={Link} to={'/home/addItem'} color="inherit" sx={{ flexGrow:1 }}>
            Add Item
          </Button>}
          <IconButton component={Link} to={'/home/cart'} color="inherit" sx={{ justifyContent: 'flex-end' }}>
            <AddShoppingCartIcon />
          </IconButton>
          <Button component={Link} to={'/login'} onClick={() => logout()} color="inherit" sx={{ flexGrow:1 }} startIcon={<LogoutIcon />}>
            <Typography>
              Logout
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header