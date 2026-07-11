import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: "#1976d2", color: "white", textAlign: "center", padding: 3, marginTop: 4 }}>
      <Typography variant="body1">
        © 2024 ShopLux. All Rights Reserved.
      </Typography>
    </Box>
  )
}