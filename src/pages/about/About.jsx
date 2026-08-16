import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"
import StarIcon from "@mui/icons-material/Star"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import shoppingImage from "../../assets/shoplux-shopping.svg"

export default function About() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const features = [
        { icon: <StorefrontOutlinedIcon />, title: t("about.value1Title"), text: t("about.value1Text") },
        { icon: <VerifiedOutlinedIcon />, title: t("about.value2Title"), text: t("about.value2Text") },
        { icon: <LocalShippingOutlinedIcon />, title: t("about.value3Title"), text: t("about.value3Text") },
        { icon: <SupportAgentOutlinedIcon />, title: t("about.value4Title"), text: t("about.value4Text") },
    ];

    return (
        <Box>
            {/* ============ SECTION 1 — About ShopLux ============ */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    alignItems: "center",
                    gap: { xs: 5, md: 8 },
                    padding: { xs: 3, sm: 5, md: 10 },
                }}
            >
                <Box sx={{ order: { xs: 2, md: 1 } }}>
                    <Box
                        sx={{
                            display: "inline-block",
                            color: "primary.main",
                            fontWeight: 700,
                            fontSize: "12px",
                            letterSpacing: 1.5,
                            marginBottom: 2,
                            textTransform: "uppercase",
                            padding: "6px 14px",
                            borderRadius: "50px",
                            border: "1px solid",
                            borderColor: "primary.main",
                        }}
                    >
                        {t("about.badge")}
                    </Box>

                    <Typography variant="h4" sx={{ fontWeight: 800, marginBottom: 2.5, lineHeight: 1.25 }}>
                        {t("about.title")}
                    </Typography>

                    <Typography sx={{ marginBottom: 2.5, lineHeight: 1.9, fontWeight: 500 }}>
                        {t("about.subtitle")}
                    </Typography>

                    <Typography color="text.secondary" sx={{ marginBottom: 4, lineHeight: 1.9 }}>
                        {t("about.introParagraph")}
                    </Typography>

                    <Button
                        onClick={() => navigate("/products")}
                        variant="contained"
                        sx={{
                            background: "linear-gradient(135deg, #6c2bd9 0%, #d2bcff 100%)",
                            padding: "10px 28px",
                            borderRadius: 3,
                        }}
                    >
                        {t("about.cta")}
                    </Button>
                </Box>

                <Box sx={{ order: { xs: 1, md: 2 }, display: "flex", justifyContent: "center" }}>
                    <Box sx={{ position: "relative", width: "100%", maxWidth: 480 }}>
                        <Box
                            sx={{
                                width: "100%",
                                height: { xs: 260, md: 380 },
                                borderRadius: 4,
                                overflow: "hidden",
                                background: "radial-gradient(circle at center,#6a2430 0%,#1d1117 85%)",
                                boxShadow: "0 30px 70px rgba(0,0,0,.35)",
                            }}
                        >
                            <Box
                                component="img"
                                src={shoppingImage}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    display: "block",
                                    transform: "scale(1.2)",
                                }}
                            />
                        </Box>

                        {/* decorative floating badge */}
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: { xs: -20, md: -24 },
                                left: { xs: 16, md: -24 },
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                backgroundColor: "background.paper",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 3,
                                padding: "12px 18px",
                                boxShadow: "0px 12px 24px -8px rgba(0,0,0,0.25)",
                            }}
                        >
                            <StarIcon sx={{ color: "#FFB07C" }} />
                            <Box>
                                <Typography sx={{ fontWeight: 800, lineHeight: 1 }}>{t("home.statsRatingValue")}</Typography>
                                <Typography variant="caption" color="text.secondary">{t("home.statsRatingLabel")}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* ============ SECTION 2 — Why Choose ShopLux? ============ */}
            <Box
                sx={{
                    background: "linear-gradient(135deg, #16081F 0%, #4700B8 100%)",
                    padding: { xs: 4, sm: 5, md: 10 },
                }}
            >
                <Box sx={{ textAlign: "center", maxWidth: 620, margin: "0 auto", marginBottom: 6 }}>
                    <Typography variant="h4" sx={{ color: "#fff", fontWeight: 800, marginBottom: 1.5 }}>
                        {t("about.whyChooseTitle")}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,.72)" }}>
                        {t("about.whyChooseSubtitle")}
                    </Typography>
                </Box>

                {/* feature cards */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
                        gap: 3,
                        marginBottom: 7,
                    }}
                >
                    {features.map((feature) => (
                        <Box
                            key={feature.title}
                            sx={{
                                padding: 3.5,
                                borderRadius: 3,
                                backgroundColor: "rgba(255,255,255,.05)",
                                border: "1px solid rgba(255,255,255,.1)",
                                transition: "transform 0.2s, background-color 0.2s",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    backgroundColor: "rgba(255,255,255,.09)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "rgba(255,176,124,.15)",
                                    color: "#FFB07C",
                                    marginBottom: 2.5,
                                }}
                            >
                                {feature.icon}
                            </Box>
                            <Typography sx={{ color: "#fff", fontWeight: 700, marginBottom: 1 }}>
                                {feature.title}
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,.65)", fontSize: "14px", lineHeight: 1.7 }}>
                                {feature.text}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,.12)", marginBottom: 6 }} />

                {/* our story subsection */}
                <Box
                    sx={{
                        maxWidth: 760,
                        margin: "0 auto",
                        textAlign: "center",
                        padding: { xs: 3, md: 5 },
                        borderRadius: 4,
                        backgroundColor: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.08)",
                    }}
                >
                    <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, marginBottom: 1.5 }}>
                        {t("about.storyTitle")}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,.75)", lineHeight: 1.9 }}>
                        {t("about.storyText")}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}