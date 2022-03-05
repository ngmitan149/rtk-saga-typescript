import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { authActions } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

export interface HeaderProps {
  toggleCollapse?: () => void
}

export function Header(props: HeaderProps) {

  const dispatch = useDispatch()

  const handleLogoutClick = () => {
    dispatch(authActions.logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.toggleCollapse}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student management
          </Typography>
          <Button color="inherit" onClick={handleLogoutClick} >Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
