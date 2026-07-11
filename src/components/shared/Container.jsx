import React from "react"
import Box from "@mui/material/Box"

export default function Container({ children }) {
    return (
        <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            {children}
        </Box>
    )
}