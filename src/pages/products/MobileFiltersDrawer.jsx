import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

import ProductFilters from "./ProductFilters"

export default function MobileFiltersDrawer({ open, onClose, isRTL, ...filterProps }) {
    const { t } = useTranslation()

    return (
        <Drawer anchor={isRTL ? "right" : "left"} open={open} onClose={onClose}>
            <Box sx={{ width: 320, maxWidth: "90vw", p: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {t("products.filters")}
                    </Typography>

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <ProductFilters {...filterProps} fullWidth />
            </Box>
        </Drawer>
    )
}