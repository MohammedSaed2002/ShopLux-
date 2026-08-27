import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"

import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import StarIcon from "@mui/icons-material/Star"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"

import { useTheme, alpha } from "@mui/material/styles"

import aboutHeroImage from "../../assets/about-hero.jpg"

export default function AboutHero({ t, navigate, isRTL }) {
    const theme = useTheme()

    const isDark = theme.palette.mode === "dark"

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: { xs: "auto", md: 650 },
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                },
                alignItems: "center",
                gap: { xs: 5, md: 8 },
                px: { xs: 3, sm: 5, md: 8, lg: 12 },
                py: { xs: 7, sm: 8, md: 10 },
                background: isDark
                    ? `linear-gradient(
                        135deg,
                        ${theme.palette.background.default} 0%,
                        ${alpha(theme.palette.primary.dark, 0.35)} 100%
                    )`
                    : `linear-gradient(
                        135deg,
                        ${theme.palette.background.default} 0%,
                        ${alpha(theme.palette.primary.light, 0.12)} 100%
                    )`,
            }}
        >
            {/* الدائرة الزخرفية العلوية — position:absolute فيزيائي، لازم isRTL يدوي */}
            <Box
                sx={{
                    position: "absolute",
                    width: 350,
                    height: 350,
                    borderRadius: "50%",
                    top: -150,
                    left: isRTL ? "auto" : -120,
                    right: isRTL ? -120 : "auto",
                    background: alpha(theme.palette.primary.main, 0.08),
                    filter: "blur(10px)",
                    pointerEvents: "none",
                }}
            />

            {/* الدائرة الزخرفية السفلية */}
            <Box
                sx={{
                    position: "absolute",
                    width: 280,
                    height: 280,
                    borderRadius: "50%",
                    bottom: -130,
                    right: isRTL ? "auto" : -80,
                    left: isRTL ? -80 : "auto",
                    background: alpha(theme.palette.secondary.main, 0.07),
                    filter: "blur(12px)",
                    pointerEvents: "none",
                }}
            />

            {/* النص — بدون order، الترتيب بالـ DOM كافي والمتصفح بيقلب تلقائيًا */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: {
                        xs: "center",
                        md: "start",
                    },
                }}
            >
                <Chip
                    icon={<StorefrontOutlinedIcon />}
                    label={t("about.hero.badge")}
                    variant="outlined"
                    sx={{
                        mb: 3,
                        px: 1,
                        py: 2.5,
                        borderRadius: 10,
                        borderColor: alpha(theme.palette.primary.main, 0.35),
                        color: "primary.main",
                        fontWeight: 700,
                        "& .MuiChip-icon": {
                            color: "primary.main",
                        },
                    }}
                />

                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "2.3rem",
                            sm: "3rem",
                            md: "3.8rem",
                            lg: "4.4rem",
                        },
                        fontWeight: 900,
                        lineHeight: 1.08,
                        letterSpacing: "-1.5px",
                        mb: 3,
                        maxWidth: 650,
                    }}
                >
                    {t("about.hero.title")}
                </Typography>

                <Typography
                    sx={{
                        fontSize: {
                            xs: "1rem",
                            md: "1.15rem",
                        },
                        lineHeight: 1.9,
                        color: "text.secondary",
                        maxWidth: 620,
                        mb: 4,
                    }}
                >
                    {t("about.hero.description")}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: {
                            xs: "center",
                            md: "flex-start",
                        },
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/products")}
                        endIcon={
                            isRTL ? (
                                <ArrowForwardIcon sx={{ transform: "rotate(180deg)" }} />
                            ) : (
                                <ArrowForwardIcon />
                            )
                        }
                        sx={{
                            px: 3.5,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 700,
                            boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.25)}`,
                        }}
                    >
                        {t("about.hero.button")}
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/products")}
                        sx={{
                            px: 3.5,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 700,
                        }}
                    >
                        {t("about.hero.secondaryButton")}
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 4,
                        justifyContent: {
                            xs: "center",
                            md: "flex-start",
                        },
                        color: "text.secondary",
                    }}
                >
                    <CheckCircleOutlinedIcon sx={{ fontSize: 20, color: "success.main" }} />

                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {t("about.hero.trust")}
                    </Typography>
                </Box>
            </Box>

            {/* الصورة — بدون order برضه */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: 580,
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            height: { xs: 340, sm: 430, md: 500 },
                            borderRadius: { xs: 4, md: 6 },
                            overflow: "hidden",
                            boxShadow: `0 30px 70px ${alpha(theme.palette.common.black, isDark ? 0.35 : 0.16)}`,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Box
                            component="img"
                            src={aboutHeroImage}
                            alt={t("about.images.heroAlt")}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                                display: "block",
                            }}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                background: `linear-gradient(
                                    180deg,
                                    transparent 50%,
                                    ${alpha(theme.palette.common.black, 0.5)} 100%
                                )`,
                            }}
                        />
                    </Box>

                    {/* البادج العائم — position:absolute فيزيائي، isRTL يدوي ضروري */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: { xs: -18, md: -24 },
                            left: isRTL ? "auto" : { xs: 12, md: -28 },
                            right: isRTL ? { xs: 12, md: -28 } : "auto",
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            px: 2,
                            py: 1.5,
                            borderRadius: 3,
                            backgroundColor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: `0 18px 40px ${alpha(theme.palette.common.black, 0.15)}`,
                        }}
                    >
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: alpha(theme.palette.warning.main, 0.12),
                                color: "warning.main",
                            }}
                        >
                            <StarIcon />
                        </Box>

                        <Box>
                            <Typography sx={{ fontWeight: 900, lineHeight: 1.1 }}>
                                4.9/5
                            </Typography>

                            <Typography variant="caption" color="text.secondary">
                                {t("about.hero.rating")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}