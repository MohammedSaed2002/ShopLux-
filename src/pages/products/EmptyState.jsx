import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import SearchOffIcon from "@mui/icons-material/SearchOff"

export default function EmptyState({ onClear }) {
    const { t } = useTranslation()

    return (
        <Box
            sx={{
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2.5,
                p: 3,
            }}
        >
            <SearchOffIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1.5 }} />

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {t("products.noResults")}
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 2 }}>
                {t("products.tryDifferentFilters")}
            </Typography>

            <Button variant="outlined" onClick={onClear}>
                {t("products.clearFilters")}
            </Button>
        </Box>
    )
}