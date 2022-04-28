import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { ModuleList } from './../models/common';

export const capitalizeString = (str: string): string => {
  if (!str || typeof str !== 'string') return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};

export const moduleList: ModuleList[] = [
  {
    id: 'm1',
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: "DashboardIcon",
    component: 'Dashboard'
  },
  {
    id: 'm2',
    name: 'Students',
    path: '/admin/students',
    icon: "PeopleAltIcon",
    component: 'Students'
  },
  {
    id: 'm3',
    name: 'Users',
    path: '/admin/users',
    icon: "PeopleAltIcon",
    component: 'Users'
  }
]