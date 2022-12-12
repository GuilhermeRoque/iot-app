import * as React from 'react';
import Box from '@mui/material/Box';
import MiniDrawer from './Drawer/Drawer';
import { Outlet } from "react-router-dom";

export default function Dashboard() {
    return(
        <Box sx={{ 
            display: 'flex' ,
            }}>
            <MiniDrawer/>
            <Box component="main" sx={{ 
                margin: 6,
                p: 3,
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                }}>
                {/* <DrawerHeader/> */}
                <Outlet/>
            </Box>
        </Box>
    )
}