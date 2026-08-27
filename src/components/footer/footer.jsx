import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import SendIcon from "@mui/icons-material/Send"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const ROUTE_MAP = {
    newArrivals: "/products",
    bestsellers: "/products",
    limitedEditions: "/products",
    contactSupport: "/contact",
    aboutUs: "/about",
};

export default function Footer() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const collectionsLinks = [
        { key: "newArrivals", label: t("footer.newArrivals") },
        { key: "bestsellers", label: t("footer.bestsellers") },
        { key: "limitedEditions", label: t("footer.limitedEditions") },
        { key: "sustainability", label: t("footer.sustainability") },
    ];

    const careLinks = [
        { key: "shippingReturns", label: t("footer.shippingReturns") },
        { key: "contactSupport", label: t("footer.contactSupport") },
        { key: "privacyPolicy", label: t("footer.privacyPolicy") },
        { key: "aboutUs", label: t("footer.aboutUs") },
    ];

    const renderLink = (item) => {
        const route = ROUTE_MAP[item.key];
        return (
            <Typography
                key={item.key}
                component="span"
                role={route ? "button" : undefined}
                tabIndex={route ? 0 : undefined}
                onClick={route ? () => navigate(route) : undefined}
                onKeyDown={route ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(route);
                    }
                } : undefined}
                color="text.secondary"
                sx={{
                    display: "block",
                    marginBottom: 1,
                    cursor: "pointer",
                    transition: "color 0.2s",
                    "&:hover": { color: "primary.main" },
                }}
            >
                {item.label}
            </Typography>
        );
    };

    const handleSubscribe = () => {
        if (!email.trim()) return;
        setSubscribed(true);
        setEmail("");
    };

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
                    {collectionsLinks.map(renderLink)}
                </Box>

                <Box sx={{ flex: "1 1 160px" }}>
                    <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        {t("footer.careTitle")}
                    </Typography>
                    {careLinks.map(renderLink)}
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
                            type="email"
                            placeholder={t("footer.emailPlaceholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                            fullWidth
                        />
                        <IconButton
                            onClick={handleSubscribe}
                            sx={{ backgroundColor: "primary.dark", color: "#fff", "&:hover": { backgroundColor: "primary.main" } }}
                        >
                            <SendIcon
                                fontSize="small"
                                sx={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ borderTop: "1px solid", borderColor: "divider", padding: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    {t("footer.copyright")}
                </Typography>
            </Box>

            <Snackbar
                open={subscribed}
                autoHideDuration={3000}
                onClose={() => setSubscribed(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setSubscribed(false)} severity="success" sx={{ width: "100%" }}>
                    {t("footer.newsletterTitle")}
                </Alert>
            </Snackbar>
        </Box>
    )
}