import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import heroImage from "../../assets/shoplux-hero.svg"

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"

export default function Hero({ t, navigate, isDark, isRTL }) {
    const trustItems = [
        { icon: LocalShippingOutlinedIcon, title: t("home.trustShipping"), description: t("home.trustShippingDesc") },
        { icon: SecurityOutlinedIcon, title: t("home.trustPayment"), description: t("home.trustPaymentDesc") },
        { icon: ReplayOutlinedIcon, title: t("home.trustReturns"), description: t("home.trustReturnsDesc") },
        { icon: SupportAgentOutlinedIcon, title: t("home.trustSupport"), description: t("home.trustSupportDesc") },
    ]

    return (
        <>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    minHeight: { xs: "auto", md: "670px", lg: "700px" },
                    background: isDark
                        ? "linear-gradient(135deg, #6E2BFF 0%, #4700B8 45%, #16081F 100%)"
                        : "linear-gradient(135deg, #F4EEFF 0%, #E8D9FF 48%, #FFFFFF 100%)",
                    px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
                    py: { xs: 5, sm: 6, md: 7, lg: 8 },
                    display: "flex",
                    alignItems: "center",
                    transition: "background 0.35s ease",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        backgroundImage: isDark
                            ? "radial-gradient(circle, rgba(255,255,255,.65) 1.3px, transparent 1.3px)"
                            : "radial-gradient(circle, rgba(110,43,255,.25) 1.3px, transparent 1.3px)",
                        backgroundSize: "90px 90px",
                        opacity: isDark ? 0.35 : 0.5,
                        pointerEvents: "none",
                    },
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        width: { xs: "350px", md: "500px", lg: "650px" },
                        height: { xs: "350px", md: "500px", lg: "650px" },
                        right: isRTL ? "auto" : { xs: "-180px", md: "-160px", lg: "-180px" },
                        left: isRTL ? { xs: "-180px", md: "-160px", lg: "-180px" } : "auto",
                        top: { xs: "35%", md: "10%" },
                        borderRadius: "50%",
                        background: isDark ? "rgba(255,176,124,0.10)" : "rgba(110,43,255,0.08)",
                        filter: "blur(80px)",
                        pointerEvents: "none",
                    },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        maxWidth: "1450px",
                        mx: "auto",
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        alignItems: "center",
                        gap: { xs: 4, sm: 5, md: 2, lg: 3 },
                        direction: "ltr",
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 500,
                            order: { xs: 1, md: isRTL ? 2 : 1 },
                            textAlign: { xs: "center", md: isRTL ? "right" : "left" },
                            justifySelf: { xs: "center", md: isRTL ? "end" : "start" },
                            direction: isRTL ? "rtl" : "ltr",
                        }}
                    >
                        <Typography
                            component="h1"
                            sx={{
                                color: isDark ? "#FFFFFF" : "#24113F",
                                fontWeight: 700,
                                fontSize: { xs: "1.8rem", sm: "2.1rem", md: "2.5rem", lg: "2.7rem", xl: "3rem" },
                                lineHeight: 1.25,
                                margin: 0,
                            }}
                        >
                            {t("home.heroLine1")}{" "}
                            <Box component="span" sx={{ color: "#FFB07C" }}>
                                {t("home.heroLine2")}
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                color: isDark ? "rgba(255,255,255,.78)" : "rgba(36,17,63,.70)",
                                fontSize: { xs: "14px", sm: "15px", lg: "16px" },
                                lineHeight: 1.8,
                                mt: 2.5,
                                mb: 4,
                                maxWidth: 420,
                                ml: { xs: "auto", md: isRTL ? "auto" : 0 },
                                mr: { xs: "auto", md: isRTL ? 0 : "auto" },
                            }}
                        >
                            {t("home.heroDescription")}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: { xs: "center", md: isRTL ? "flex-end" : "flex-start" },
                                flexWrap: "wrap",
                                direction: isRTL ? "rtl" : "ltr",
                            }}
                        >
                            <Button
                                onClick={() => navigate("/products")}
                                sx={{
                                    width: { xs: 155, sm: 170 },
                                    height: 46,
                                    borderRadius: "50px",
                                    background: "#FFB07C",
                                    color: "#432100",
                                    fontWeight: 700,
                                    textTransform: "none",
                                    fontSize: "15px",
                                    boxShadow: "0 8px 25px rgba(255,176,124,0.20)",
                                    "&:hover": { background: "#ffc199" },
                                }}
                            >
                                {t("home.shopCollection")}
                            </Button>

                            <Button
                                onClick={() => navigate("/products")}
                                sx={{
                                    width: { xs: 155, sm: 170 },
                                    height: 46,
                                    borderRadius: "50px",
                                    background: isDark ? "rgba(255,255,255,.08)" : "rgba(110,43,255,.08)",
                                    border: isDark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(110,43,255,.25)",
                                    color: isDark ? "#FFFFFF" : "#5A20C8",
                                    fontWeight: 500,
                                    textTransform: "none",
                                    fontSize: "15px",
                                    "&:hover": {
                                        background: isDark ? "rgba(255,255,255,.15)" : "rgba(110,43,255,.14)",
                                    },
                                }}
                            >
                                {t("home.viewAll")}
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                            order: { xs: 2, md: isRTL ? 1 : 2 },
                            display: "flex",
                            justifyContent: { xs: "center", md: isRTL ? "flex-start" : "flex-end" },
                            mr: { md: isRTL ? 0 : "calc(-1 * max(0px, (100vw - 1450px) / 2))" },
                            ml: { md: isRTL ? "calc(-1 * max(0px, (100vw - 1450px) / 2))" : 0 },
                            alignItems: "center",
                            overflow: "visible",
                            position: "relative",
                            direction: "ltr",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                width: { xs: "260px", sm: "350px", md: "480px", lg: "600px" },
                                height: { xs: "260px", sm: "350px", md: "480px", lg: "600px" },
                                borderRadius: "50%",
                                background: isDark ? "rgba(255,176,124,0.08)" : "rgba(110,43,255,0.06)",
                                filter: "blur(60px)",
                                zIndex: -1,
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src={heroImage}
                            alt={t("home.heroImageAlt")}
                            sx={{
                                display: "block",
                                width: { xs: "100%", sm: "100%", md: "135%", lg: "145%", xl: "150%" },
                                maxWidth: { xs: "430px", sm: "520px", md: "720px", lg: "800px", xl: "900px" },
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Trust strip — merged into Hero, sits directly beneath it */}
            <Box
                component="section"
                sx={{
                    backgroundColor: isDark ? "#170B22" : "#FFFFFF",
                    borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(36,17,63,0.08)",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1450px",
                        mx: "auto",
                        px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
                        py: { xs: 3, md: 3.5 },
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
                        gap: { xs: 2.5, sm: 3, md: 0 },
                        direction: isRTL ? "rtl" : "ltr",
                    }}
                >
                    {trustItems.map((item, index) => {
                        const Icon = item.icon

                        return (
                            <Box
                                key={item.title}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: { xs: "flex-start", md: "center" },
                                    gap: 1.5,
                                    px: { xs: 1, md: 2 },
                                    py: { xs: 1, md: 0 },
                                    borderRight: {
                                        md: !isRTL && index !== 3
                                            ? isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(36,17,63,0.08)"
                                            : "none",
                                    },
                                    borderLeft: {
                                        md: isRTL && index !== 3
                                            ? isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(36,17,63,0.08)"
                                            : "none",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        minWidth: 42,
                                        borderRadius: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: isDark ? "rgba(255,176,124,0.10)" : "rgba(110,43,255,0.08)",
                                        color: isDark ? "#FFB07C" : "#6E2BFF",
                                    }}
                                >
                                    <Icon sx={{ fontSize: 22 }} />
                                </Box>

                                <Box sx={{ direction: isRTL ? "rtl" : "ltr" }}>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: "13px", sm: "14px" },
                                            fontWeight: 700,
                                            color: isDark ? "#FFFFFF" : "#24113F",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            display: { xs: "none", sm: "block" },
                                            mt: 0.4,
                                            fontSize: "12px",
                                            color: isDark ? "rgba(255,255,255,0.55)" : "rgba(36,17,63,0.55)",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}