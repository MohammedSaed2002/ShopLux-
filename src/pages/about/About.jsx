import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme, alpha } from "@mui/material/styles";

import aboutHeroImage from "../../assets/about-hero.jpg";
import aboutStoryImage from "../../assets/about-story.jpg";
import aboutTeamImage from "../../assets/about-team.jpg";

export default function About() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();

    const isRTL = i18n.dir() === "rtl";
    const isDark = theme.palette.mode === "dark";

    const features = [
        {
            icon: <LocalShippingOutlinedIcon />,
            title: t("about.features.shipping.title"),
            text: t("about.features.shipping.text"),
        },
        {
            icon: <SecurityOutlinedIcon />,
            title: t("about.features.payment.title"),
            text: t("about.features.payment.text"),
        },
        {
            icon: <VerifiedOutlinedIcon />,
            title: t("about.features.quality.title"),
            text: t("about.features.quality.text"),
        },
        {
            icon: <SupportAgentOutlinedIcon />,
            title: t("about.features.support.title"),
            text: t("about.features.support.text"),
        },
    ];

    const values = [
        {
            icon: <FavoriteBorderOutlinedIcon />,
            title: t("about.values.customer.title"),
            text: t("about.values.customer.text"),
        },
        {
            icon: <WorkspacePremiumOutlinedIcon />,
            title: t("about.values.quality.title"),
            text: t("about.values.quality.text"),
        },
        {
            icon: <PublicOutlinedIcon />,
            title: t("about.values.trust.title"),
            text: t("about.values.trust.text"),
        },
        {
            icon: <AutoAwesomeOutlinedIcon />,
            title: t("about.values.innovation.title"),
            text: t("about.values.innovation.text"),
        },
    ];

    const stats = [
        {
            value: "10K+",
            label: t("about.stats.customers"),
            icon: <GroupsOutlinedIcon />,
        },
        {
            value: "500+",
            label: t("about.stats.products"),
            icon: <ShoppingBagOutlinedIcon />,
        },
        {
            value: "99%",
            label: t("about.stats.satisfaction"),
            icon: <StarIcon />,
        },
        {
            value: "24/7",
            label: t("about.stats.support"),
            icon: <SupportAgentOutlinedIcon />,
        },
    ];

    return (
        <Box
            dir={isRTL ? "rtl" : "ltr"}
            sx={{
                overflow: "hidden",
                backgroundColor: "background.default",
                color: "text.primary",
            }}
        >
            {/* =========================================================
                SECTION 1 — HERO
            ========================================================= */}
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
                {/* Decorative background */}
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

                {/* Hero Text */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        order: {
                            xs: 2,
                            md: isRTL ? 2 : 1,
                        },
                        textAlign: {
                            xs: "center",
                            md: isRTL ? "right" : "left",
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
                                md: isRTL ? "flex-start" : "flex-start",
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
                                    <ArrowForwardIcon
                                        sx={{ transform: "rotate(180deg)" }}
                                    />
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
                                boxShadow: `0 12px 30px ${alpha(
                                    theme.palette.primary.main,
                                    0.25
                                )}`,
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

                    {/* Trust mini row */}
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
                        <CheckCircleOutlinedIcon
                            sx={{
                                fontSize: 20,
                                color: "success.main",
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            {t("about.hero.trust")}
                        </Typography>
                    </Box>
                </Box>

                {/* Hero Image */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        order: {
                            xs: 1,
                            md: isRTL ? 1 : 2,
                        },
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
                                height: {
                                    xs: 340,
                                    sm: 430,
                                    md: 500,
                                },
                                borderRadius: {
                                    xs: 4,
                                    md: 6,
                                },
                                overflow: "hidden",
                                boxShadow: `0 30px 70px ${alpha(
                                    theme.palette.common.black,
                                    isDark ? 0.35 : 0.16
                                )}`,
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

                            {/* Image overlay */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    background: `linear-gradient(
                                        180deg,
                                        transparent 50%,
                                        ${alpha(
                                            theme.palette.common.black,
                                            0.5
                                        )} 100%
                                    )`,
                                }}
                            />
                        </Box>

                        {/* Floating rating card */}
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
                                boxShadow: `0 18px 40px ${alpha(
                                    theme.palette.common.black,
                                    0.15
                                )}`,
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
                                    backgroundColor: alpha(
                                        theme.palette.warning.main,
                                        0.12
                                    ),
                                    color: "warning.main",
                                }}
                            >
                                <StarIcon />
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 900,
                                        lineHeight: 1.1,
                                    }}
                                >
                                    4.9/5
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {t("about.hero.rating")}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* =========================================================
                SECTION 2 — STATS
            ========================================================= */}
            <Box
                sx={{
                    px: { xs: 3, sm: 5, md: 8, lg: 12 },
                    py: { xs: 6, md: 8 },
                    backgroundColor: "background.paper",
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1250,
                        mx: "auto",
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr 1fr",
                            md: "repeat(4, 1fr)",
                        },
                        gap: 0,
                    }}
                >
                    {stats.map((stat, index) => (
                        <Box
                            key={stat.label}
                            sx={{
                                textAlign: "center",
                                px: { xs: 2, md: 3 },
                                py: 2,
                                borderRight:
                                    !isRTL && index !== stats.length - 1
                                        ? "1px solid"
                                        : "none",
                                borderLeft:
                                    isRTL && index !== stats.length - 1
                                        ? "1px solid"
                                        : "none",
                                borderColor: "divider",
                                borderBottom: {
                                    xs:
                                        index < 2
                                            ? "1px solid"
                                            : "none",
                                    md: "none",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 46,
                                    height: 46,
                                    mx: "auto",
                                    mb: 1.5,
                                    borderRadius: 2.5,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: alpha(
                                        theme.palette.primary.main,
                                        0.1
                                    ),
                                    color: "primary.main",
                                }}
                            >
                                {stat.icon}
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "1.6rem",
                                        md: "2rem",
                                    },
                                    fontWeight: 900,
                                    lineHeight: 1.1,
                                    mb: 0.5,
                                }}
                            >
                                {stat.value}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* =========================================================
                SECTION 3 — OUR STORY
            ========================================================= */}
            <Box
                sx={{
                    px: { xs: 3, sm: 5, md: 8, lg: 12 },
                    py: { xs: 8, md: 12 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1250,
                        mx: "auto",
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: { xs: 6, md: 10 },
                        alignItems: "center",
                    }}
                >
                    {/* Image */}
                    <Box
                        sx={{
                            order: {
                                xs: 1,
                                md: isRTL ? 2 : 1,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                borderRadius: 5,
                                overflow: "hidden",
                                height: {
                                    xs: 350,
                                    sm: 450,
                                    md: 520,
                                },
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: `0 25px 60px ${alpha(
                                    theme.palette.common.black,
                                    0.12
                                )}`,
                            }}
                        >
                            <Box
                                component="img"
                                src={aboutStoryImage}
                                alt={t("about.images.storyAlt")}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Text */}
                    <Box
                        sx={{
                            order: {
                                xs: 2,
                                md: isRTL ? 1 : 2,
                            },
                            textAlign: {
                                xs: "center",
                                md: isRTL ? "right" : "left",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                color: "primary.main",
                                fontWeight: 800,
                                fontSize: "0.8rem",
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                mb: 1.5,
                            }}
                        >
                            {t("about.story.eyebrow")}
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                lineHeight: 1.15,
                                mb: 3,
                                fontSize: {
                                    xs: "2rem",
                                    md: "2.8rem",
                                },
                            }}
                        >
                            {t("about.story.title")}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.95,
                                mb: 3,
                            }}
                        >
                            {t("about.story.text1")}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.95,
                                mb: 4,
                            }}
                        >
                            {t("about.story.text2")}
                        </Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gap: 2,
                            }}
                        >
                            {[
                                t("about.story.point1"),
                                t("about.story.point2"),
                                t("about.story.point3"),
                            ].map((point) => (
                                <Box
                                    key={point}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        justifyContent: {
                                            xs: "center",
                                            md: "flex-start",
                                        },
                                    }}
                                >
                                    <CheckCircleOutlinedIcon
                                        sx={{
                                            color: "success.main",
                                            fontSize: 22,
                                            flexShrink: 0,
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                        }}
                                    >
                                        {point}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* =========================================================
                SECTION 4 — WHY CHOOSE SHOPLUX
            ========================================================= */}
            <Box
                sx={{
                    px: { xs: 3, sm: 5, md: 8, lg: 12 },
                    py: { xs: 8, md: 11 },
                    backgroundColor: isDark
                        ? alpha(theme.palette.primary.main, 0.09)
                        : alpha(theme.palette.primary.main, 0.045),
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1250,
                        mx: "auto",
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 700,
                            mx: "auto",
                            textAlign: "center",
                            mb: 6,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "primary.main",
                                fontWeight: 800,
                                fontSize: "0.8rem",
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                mb: 1.5,
                            }}
                        >
                            {t("about.whyChoose.eyebrow")}
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                mb: 2,
                                fontSize: {
                                    xs: "2rem",
                                    md: "2.8rem",
                                },
                            }}
                        >
                            {t("about.whyChoose.title")}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.8,
                            }}
                        >
                            {t("about.whyChoose.subtitle")}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                                lg: "repeat(4, 1fr)",
                            },
                            gap: 3,
                        }}
                    >
                        {features.map((feature) => (
                            <Box
                                key={feature.title}
                                sx={{
                                    p: 3.5,
                                    borderRadius: 4,
                                    backgroundColor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    transition:
                                        "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                                    "&:hover": {
                                        transform: "translateY(-7px)",
                                        borderColor: alpha(
                                            theme.palette.primary.main,
                                            0.35
                                        ),
                                        boxShadow: `0 18px 40px ${alpha(
                                            theme.palette.common.black,
                                            isDark ? 0.18 : 0.08
                                        )}`,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 54,
                                        height: 54,
                                        borderRadius: 2.5,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 2.5,
                                        backgroundColor: alpha(
                                            theme.palette.primary.main,
                                            0.1
                                        ),
                                        color: "primary.main",
                                    }}
                                >
                                    {feature.icon}
                                </Box>

                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        mb: 1,
                                    }}
                                >
                                    {feature.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {feature.text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* =========================================================
                SECTION 5 — OUR VALUES
            ========================================================= */}
            <Box
                sx={{
                    px: { xs: 3, sm: 5, md: 8, lg: 12 },
                    py: { xs: 8, md: 11 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1250,
                        mx: "auto",
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                            maxWidth: 700,
                            mx: "auto",
                            mb: 6,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "primary.main",
                                fontWeight: 800,
                                fontSize: "0.8rem",
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                mb: 1.5,
                            }}
                        >
                            {t("about.values.eyebrow")}
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                mb: 2,
                                fontSize: {
                                    xs: "2rem",
                                    md: "2.8rem",
                                },
                            }}
                        >
                            {t("about.values.title")}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.8,
                            }}
                        >
                            {t("about.values.subtitle")}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                                lg: "repeat(4, 1fr)",
                            },
                            gap: 3,
                        }}
                    >
                        {values.map((value) => (
                            <Box
                                key={value.title}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    backgroundColor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    textAlign: {
                                        xs: "center",
                                        md: isRTL ? "right" : "left",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 2.5,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 2,
                                        mx: {
                                            xs: "auto",
                                            md: isRTL ? 0 : 0,
                                        },
                                        backgroundColor: alpha(
                                            theme.palette.secondary.main,
                                            0.1
                                        ),
                                        color: "secondary.main",
                                    }}
                                >
                                    {value.icon}
                                </Box>

                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        mb: 1,
                                    }}
                                >
                                    {value.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {value.text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* =========================================================
                SECTION 6 — TEAM / OPERATIONS
            ========================================================= */}
            <Box
                sx={{
                    px: { xs: 3, sm: 5, md: 8, lg: 12 },
                    py: { xs: 8, md: 11 },
                    backgroundColor: "background.paper",
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1250,
                        mx: "auto",
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: { xs: 6, md: 10 },
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            order: {
                                xs: 1,
                                md: isRTL ? 2 : 1,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                height: {
                                    xs: 320,
                                    sm: 400,
                                    md: 470,
                                },
                                borderRadius: 5,
                                overflow: "hidden",
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: `0 25px 60px ${alpha(
                                    theme.palette.common.black,
                                    0.1
                                )}`,
                            }}
                        >
                            <Box
                                component="img"
                                src={aboutTeamImage}
                                alt={t("about.images.teamAlt")}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            order: {
                                xs: 2,
                                md: isRTL ? 1 : 2,
                            },
                            textAlign: {
                                xs: "center",
                                md: isRTL ? "right" : "left",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                color: "primary.main",
                                fontWeight: 800,
                                fontSize: "0.8rem",
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                mb: 1.5,
                            }}
                        >
                            {t("about.operations.eyebrow")}
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                mb: 3,
                                lineHeight: 1.15,
                                fontSize: {
                                    xs: "2rem",
                                    md: "2.7rem",
                                },
                            }}
                        >
                            {t("about.operations.title")}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.9,
                                mb: 3,
                            }}
                        >
                            {t("about.operations.text")}
                        </Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1.5,
                                    alignItems: "flex-start",
                                    justifyContent: {
                                        xs: "center",
                                        md: "flex-start",
                                    },
                                }}
                            >
                                <TrendingUpOutlinedIcon
                                    sx={{
                                        color: "primary.main",
                                        mt: 0.3,
                                    }}
                                />

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 800,
                                            mb: 0.5,
                                        }}
                                    >
                                        {t("about.operations.point1Title")}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {t("about.operations.point1Text")}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1.5,
                                    alignItems: "flex-start",
                                    justifyContent: {
                                        xs: "center",
                                        md: "flex-start",
                                    },
                                }}
                            >
                                <VerifiedOutlinedIcon
                                    sx={{
                                        color: "success.main",
                                        mt: 0.3,
                                    }}
                                />

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 800,
                                            mb: 0.5,
                                        }}
                                    >
                                        {t("about.operations.point2Title")}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {t("about.operations.point2Text")}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* =========================================================
                SECTION 7 — FINAL CTA
            ========================================================= */}
            <Box
                sx={{
                    px: { xs: 3, sm: 5, md: 8, lg: 12 },
                    py: { xs: 8, md: 10 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1150,
                        mx: "auto",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: { xs: 4, md: 6 },
                        px: { xs: 3, sm: 5, md: 8 },
                        py: { xs: 6, md: 8 },
                        textAlign: "center",
                        background: isDark
                            ? `linear-gradient(
                                135deg,
                                ${alpha(theme.palette.primary.dark, 0.65)},
                                ${alpha(theme.palette.secondary.dark, 0.45)}
                            )`
                            : `linear-gradient(
                                135deg,
                                ${alpha(theme.palette.primary.main, 0.12)},
                                ${alpha(theme.palette.secondary.main, 0.1)}
                            )`,
                        border: "1px solid",
                        borderColor: alpha(
                            theme.palette.primary.main,
                            0.2
                        ),
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            width: 250,
                            height: 250,
                            borderRadius: "50%",
                            top: -150,
                            left: -100,
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                            ),
                            filter: "blur(10px)",
                        }}
                    />

                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                mb: 2,
                                fontSize: {
                                    xs: "2rem",
                                    md: "2.8rem",
                                },
                            }}
                        >
                            {t("about.cta.title")}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                maxWidth: 650,
                                mx: "auto",
                                lineHeight: 1.8,
                                mb: 4,
                            }}
                        >
                            {t("about.cta.text")}
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/products")}
                            endIcon={
                                isRTL ? (
                                    <ArrowForwardIcon
                                        sx={{ transform: "rotate(180deg)" }}
                                    />
                                ) : (
                                    <ArrowForwardIcon />
                                )
                            }
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 800,
                            }}
                        >
                            {t("about.cta.button")}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}