import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import HubIcon from '@mui/icons-material/Hub';
import IconButton from '@mui/material/IconButton';
import EdgesensorLowIcon from '@mui/icons-material/EdgesensorLow';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ApiIcon from '@mui/icons-material/Api';
import GroupsIcon from '@mui/icons-material/Groups';
import DrawerItem from './DrawerItem';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import { DrawerHeader } from './DrawerHeader';
import { DrawerAppBar } from '../AppBar';
import CellTowerIcon from '@mui/icons-material/CellTower';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      }}>
      <CssBaseline />
        <DrawerAppBar open={open} drawerwidth={drawerWidth} toggleDrawer={handleDrawerOpen} ></DrawerAppBar>
        <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <DrawerItem open={open} text={"Apresentação"} Icon={HomeIcon} link={'/'}/>
          <DrawerItem open={open} text={"Organizações"} Icon={BusinessIcon} link={'/organizations'}/>
        </List>
        <Divider />
        <List>
          <DrawerItem open={open} text={"Participantes"} Icon={GroupsIcon} link={'organizations/members'}/>
          <DrawerItem open={open} text={"Aplicações"} Icon={AppsIcon} link={'organizations/applications'}/>
          <DrawerItem open={open} text={"Perfis LoRaWAN"} Icon={CellTowerIcon} link={'organizations/lorawan-profiles'}/>
          <DrawerItem open={open} text={"Perfis de Serviço"} Icon={SettingsApplicationsIcon} link={'organizations/service-profiles'}/>
          <DrawerItem open={open} text={"Dispositivos"} Icon={EdgesensorLowIcon} link={'organizations/devices'}/>
        </List>
        <Divider />
        <List>
          <DrawerItem open={open} text={"Integrações"} Icon={HubIcon} link={'integrations'}/>
          <DrawerItem open={open} text={"APIs de dispositivos"} Icon={ApiIcon} link={'device-apis'}/>
        </List>
      </Drawer>
    </Box>
  );
}
