import * as React from 'react';
import Box from '@mui/material/Box';
import MiniDrawer from '../Drawer/Drawer';
import { DrawerHeader } from '../Drawer/DrawerHeader';
import { Outlet } from "react-router-dom";
export default function Dashboard() {
    return(
        <Box sx={{ display: 'flex' }}>
            <MiniDrawer/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader/>
                <Outlet/>
            </Box>
        </Box>
    )
}