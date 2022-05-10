import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export default function DrawerItem({ text, open, Icon, link }){
    return(
        <ListItemButton
            key={ text }
            sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}
            component={Link}
            to={link}
        >
        <ListItemIcon
            sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
            }}>
            <Icon/>
        </ListItemIcon>
        <ListItemText primary={ text } sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>

    )
}