import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import SendIcon from "@mui/icons-material/Send"
import { useTranslation } from "react-i18next"

export default function Footer() {
    const { t } = useTranslation();

    const collectionsLinks = [
        t("footer.newArrivals"),
        t("footer.bestsellers"),
        t("footer.limitedEditions"),
        t("footer.sustainability"),
    ];

    const careLinks = [
        t("footer.shippingReturns"),
        t("footer.contactSupport"),
        t("footer.privacyPolicy"),
        t("footer.aboutUs"),
    ];

    return (
        <Box component="footer" sx={{ backgroundColor: "background.default", borderTop: "1px solid", borderColor: "divider" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6, padding: { xs: 4, md: 10 } }}>
                <Box sx={{ flex: "2 1 260px" }}>
                    <Typography variant="h6" color="primary" sx={{ marginBottom: 2 }}>
                        ShopLux
                    </Typography>
                    <Typography color="text.secondary">
                        {t("footer.brandDescription")}
                    </Typography>
                </Box>

                <Box sx={{ flex: "1 1 160px" }}>
                    <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        {t("footer.collectionsTitle")}
                    </Typography>
                    {collectionsLinks.map((link) => (
                        <Typography
                            key={link}
                            color="text.secondary"
                            sx={{
                                marginBottom: 1,
                                cursor: "pointer",
                                transition: "color 0.2s",
                                "&:hover": { color: "primary.main" },
                            }}
                        >
                            {link}
                        </Typography>
                    ))}
                </Box>

                <Box sx={{ flex: "1 1 160px" }}>
                    <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        {t("footer.careTitle")}
                    </Typography>
                    {careLinks.map((link) => (
                        <Typography
                            key={link}
                            color="text.secondary"
                            sx={{
                                marginBottom: 1,
                                cursor: "pointer",
                                transition: "color 0.2s",
                                "&:hover": { color: "primary.main" },
                            }}
                        >
                            {link}
                        </Typography>
                    ))}
                </Box>

                <Box sx={{ flex: "1 1 220px" }}>
                    <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        {t("footer.newsletterTitle")}
                    </Typography>
                    <Typography color="text.secondary" sx={{ marginBottom: 2 }}>
                        {t("footer.newsletterDescription")}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            size="small"
                            placeholder={t("footer.emailPlaceholder")}
                            fullWidth
                        />
                        <IconButton sx={{ backgroundColor: "primary.dark", color: "#fff", "&:hover": { backgroundColor: "primary.main" } }}>
                            <SendIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ borderTop: "1px solid", borderColor: "divider", padding: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    {t("footer.copyright")}
                </Typography>
            </Box>
        </Box>
    )
}