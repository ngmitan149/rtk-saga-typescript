import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { moduleList } from 'utils';

export function Sidebar() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {moduleList.map(item => {
            
            return (
              <NavLinkCustomized key={item.id} to={item.path}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon>{item?.icon?.toLowerCase()?.replace('icon', '')}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </NavLinkCustomized>
            )
          })}
        </List>
      </nav>
    </Box>
  );
}

const NavLinkCustomized = styled(NavLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',

  "&.active > li > div": {
    backgroundColor: theme.palette.action.selected,
  }
}))