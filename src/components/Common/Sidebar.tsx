import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface ModuleList {
  id: string | number,
  name: string,
  path: string,
  selected?: boolean,
  icon?: ReactNode,
}

const moduleList: ModuleList[] = [
  {
    id: 'm1',
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon />
  },
  {
    id: 'm2',
    name: 'Students',
    path: '/admin/students',
    icon: <PeopleAltIcon />
  }
]

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
                      {item?.icon || null}
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