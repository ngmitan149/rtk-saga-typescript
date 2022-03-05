import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Header, Sidebar } from 'components/Common';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'features/dashboard';
import Students from 'features/students';

export interface AdminLayoutProps {
}

export function AdminLayout (_props: AdminLayoutProps) {

  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev)
  }

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header toggleCollapse={toggleCollapse}/>
      </HeaderWrapper>
      <SidebarWrapper className={isCollapsed ? 'collapsed' : ''}>
        <Sidebar/>
      </SidebarWrapper>
      <MainWrapper>
        <Switch>
          <Route path='/admin/dashboard'>
            <Dashboard/>
          </Route>

          <Route path='/admin/students'>
            <Students/>
          </Route>

          <Route>
            <div>
              Welcome to the rtk + saga demo.
            </div>
          </Route>
        </Switch>
      </MainWrapper>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled(Box)(({ theme }) => `
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas: "header header" "sidebar main";

  min-height: 100vh;
`)

const HeaderWrapper = styled(Box)(({ theme }) => `
  grid-area: header;
`)

const SidebarWrapper = styled(Box)(({ theme }) => `
  position: relative;
  z-index: 2;

  grid-area: sidebar;
  max-width: 240px;
  width: 240px;
  border-right: 1px solid ${theme.palette.divider};

  background-color: ${theme.palette.background.paper};

  transition: all 0.1s linear 0.1s;

  &.collapsed {
    position: relative;
    z-index: 0;

    width: 0px;
  }
`)

const MainWrapper = styled(Box)(({ theme }) => `
  position: relative;
  z-index: 1;

  grid-area: main;
  padding: ${theme.spacing(2, 3)};

  background-color: ${theme.palette.background.paper};
`)
