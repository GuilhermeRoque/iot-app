import * as React from 'react';
import Box from '@mui/material/Box';
import MiniDrawer from '../Drawer/Drawer';
import TextBox from '../TextBox/TextBox';

export default function Dashboard() {
    return(
        <Box sx={{ display: 'flex' }}>
            <MiniDrawer/>
            <TextBox/>
        </Box>
    )
}