import React from "react"
import { Paper, Box, Typography } from "@mui/material"

export default function FormPaper ({title, children}) {
    return (
        <Paper elevation={2}>
        <Box p={3}>
            <Typography component="h1" variant="h5">
                {title}
            </Typography>
            <div>{children}</div>
        </Box>
    </Paper>
    )
}