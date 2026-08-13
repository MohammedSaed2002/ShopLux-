import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"
import { useTranslation } from "react-i18next"

export default function About() {
    const { t } = useTranslation();

    const values = [
        { icon: <StorefrontOutlinedIcon fontSize="large" />, title: t("about.value1Title"), text: t("about.value1Text") },
        { icon: <VerifiedOutlinedIcon fontSize="large" />, title: t("about.value2Title"), text: t("about.value2Text") },
        { icon: <LocalShippingOutlinedIcon fontSize="large" />, title: t("about.value3Title"), text: t("about.value3Text") },
        { icon: <SupportAgentOutlinedIcon fontSize="large" />, title: t("about.value4Title"), text: t("about.value4Text") },
    ];

    return (
        <Box sx={{ padding: { xs: 3, md: 6 }, maxWidth: 1100, margin: "0 auto" }}>
            <Typography variant="h4" sx={{ fontWeight: 800, marginBottom: 1.5 }}>
                {t("about.title")}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 640, marginBottom: 6 }}>
                {t("about.subtitle")}
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
                    gap: 3,
                }}
            >
                {values.map((value) => (
                    <Box
                        key={value.title}
                        sx={{
                            padding: 3,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                            textAlign: "center",
                        }}
                    >
                        <Box sx={{ color: "primary.main", marginBottom: 1.5 }}>{value.icon}</Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, marginBottom: 1 }}>
                            {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {value.text}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    marginTop: 6,
                    padding: 4,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #6c2bd9 0%, #3e008e 100%)",
                    color: "#fff",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 1 }}>
                    {t("about.storyTitle")}
                </Typography>
                <Typography sx={{ opacity: 0.9, maxWidth: 760 }}>
                    {t("about.storyText")}
                </Typography>
            </Box>
        </Box>
    )
}