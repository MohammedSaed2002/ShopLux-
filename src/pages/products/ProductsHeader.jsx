import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "react-router-dom"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"

export default function ProductsHeader() {
    const { t } = useTranslation()

    return (
        <Box sx={{ mb: 4 }}>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link component={RouterLink} to="/" underline="hover" color="text.secondary">
                    {t("products.breadcrumbHome")}
                </Link>

                <Typography color="text.primary">
                    {t("products.breadcrumbProducts")}
                </Typography>
            </Breadcrumbs>

            <Typography
                variant="h3"
                sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    fontWeight: 700,
                    mb: 1,
                }}
            >
                {t("products.title")}
            </Typography>

            <Typography color="text.secondary" sx={{ maxWidth: 650, lineHeight: 1.8 }}>
                {t("products.subtitle")}
            </Typography>
        </Box>
    )
}