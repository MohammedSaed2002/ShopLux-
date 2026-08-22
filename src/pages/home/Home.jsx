import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@mui/material/styles"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import TextField from "@mui/material/TextField"
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined"
import SendRoundedIcon from "@mui/icons-material/SendRounded"

// Hero
import heroImage from "../../assets/shoplux-hero.svg"

// Categories
import beautyIcon from "../../assets/icons/Beauty.svg"
import electronicsIcon from "../../assets/icons/Electronics.svg"
import fashionIcon from "../../assets/icons/Fashion.svg"
import homeIcon from "../../assets/icons/Home.svg"

import useProducts from "../../hooks/useProducts"
import useAddToCart from "../../hooks/useAddToCart"

export default function Home() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const theme = useTheme()

    const isDark = theme.palette.mode === "dark"

    // Use i18next's own dir() helper instead of a strict
    // string match against "ar". This correctly detects RTL
    // even if i18n.language resolves to something like "ar-SA"
    // or "AR", which a strict === "ar" check would miss.
    const isRTL = i18n.dir() === "rtl"

    const [favorites, setFavorites] = useState({})
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    })

    const { mutate: addToCart } = useAddToCart()

    // =========================
    // Featured Products
    // =========================

    const { data, isLoading } = useProducts({
        sortBy: "rate",
        ascending: false,
    })

    const featuredProducts = useMemo(() => {
        const products = data?.response?.data || []
        return products.slice(0, 4)
    }, [data])

    // =========================
    // Trust Bar
    // =========================

    const trustItems = [
        {
            icon: LocalShippingOutlinedIcon,
            title: t("home.trustShipping"),
            description: t("home.trustShippingDesc"),
        },
        {
            icon: SecurityOutlinedIcon,
            title: t("home.trustPayment"),
            description: t("home.trustPaymentDesc"),
        },
        {
            icon: ReplayOutlinedIcon,
            title: t("home.trustReturns"),
            description: t("home.trustReturnsDesc"),
        },
        {
            icon: SupportAgentOutlinedIcon,
            title: t("home.trustSupport"),
            description: t("home.trustSupportDesc"),
        },
    ]

    
const [newsletterEmail, setNewsletterEmail] = useState("")
const [newsletterLoading, setNewsletterLoading] = useState(false)
 
const handleNewsletterSubmit = (e) => {
    e.preventDefault()
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 
    if (!emailRegex.test(newsletterEmail)) {
        setSnackbar({
            open: true,
            message: t("home.newsletterError"),
            severity: "error",
        })
        return
    }
 
    setNewsletterLoading(true)
 
    // TODO: replace with your real subscribe API call
    setTimeout(() => {
        setNewsletterLoading(false)
        setNewsletterEmail("")
 
        setSnackbar({
            open: true,
            message: t("home.newsletterSuccess"),
            severity: "success",
        })
    }, 900)
}

    // =========================
    // Categories
    // =========================

    const categories = [
        {
            image: beautyIcon,
            title: t("home.categoryBeauty"),
        },
        {
            image: electronicsIcon,
            title: t("home.categoryElectronics"),
        },
        {
            image: fashionIcon,
            title: t("home.categoryFashion"),
        },
        {
            image: homeIcon,
            title: t("home.categoryHome"),
        },
    ]

    // =========================
    // Favorites
    // =========================

    const toggleFavorite = (productId) => {
        setFavorites((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }))
    }

    // =========================
    // Add To Cart
    // =========================

    const handleAddToCart = (productId) => {
        addToCart(
            {
                productId,
                count: 1,
            },
            {
                onSuccess: () => {
                    setSnackbar({
                        open: true,
                        message: t("products.addedToCart"),
                        severity: "success",
                    })
                },
                onError: () => {
                    setSnackbar({
                        open: true,
                        message: t("products.addToCartError"),
                        severity: "error",
                    })
                },
            }
        )
    }

    return (
        <Box>
            {/* =========================================================
                HERO SECTION
            ========================================================= */}

            <Box
                component="section"
                sx={{
                    position: "relative",
                    overflow: "hidden",

                    minHeight: {
                        xs: "auto",
                        md: "670px",
                        lg: "700px",
                    },

                    background: isDark
                        ? "linear-gradient(135deg, #6E2BFF 0%, #4700B8 45%, #16081F 100%)"
                        : "linear-gradient(135deg, #F4EEFF 0%, #E8D9FF 48%, #FFFFFF 100%)",

                    px: {
                        xs: 2.5,
                        sm: 4,
                        md: 6,
                        lg: 8,
                    },

                    py: {
                        xs: 5,
                        sm: 6,
                        md: 7,
                        lg: 8,
                    },

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

                        width: {
                            xs: "350px",
                            md: "500px",
                            lg: "650px",
                        },

                        height: {
                            xs: "350px",
                            md: "500px",
                            lg: "650px",
                        },

                        right: isRTL
                            ? "auto"
                            : {
                                  xs: "-180px",
                                  md: "-160px",
                                  lg: "-180px",
                              },

                        left: isRTL
                            ? {
                                  xs: "-180px",
                                  md: "-160px",
                                  lg: "-180px",
                              }
                            : "auto",

                        top: {
                            xs: "35%",
                            md: "10%",
                        },

                        borderRadius: "50%",

                        background: isDark
                            ? "rgba(255,176,124,0.10)"
                            : "rgba(110,43,255,0.08)",

                        filter: "blur(80px)",

                        pointerEvents: "none",
                    },
                }}
            >
                {/* Hero content
                    IMPORTANT:
                    direction is always LTR here so the image
                    does not move when switching language.
                    The visual left/right swap between languages
                    is handled purely via the `order` property
                    below (based on isRTL), not via `direction`.
                */}

                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        maxWidth: "1450px",
                        mx: "auto",

                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },

                        alignItems: "center",

                        gap: {
                            xs: 4,
                            sm: 5,
                            md: 2,
                            lg: 3,
                        },

                        direction: "ltr",
                    }}
                >
                    {/* ================= TEXT =================
                        English (isRTL false): LEFT column (order 1)
                        Arabic  (isRTL true):  RIGHT column (order 2)
                    */}

                    <Box
                        sx={{
                            maxWidth: 500,

                            order: {
                                xs: 1,
                                md: isRTL ? 2 : 1,
                            },

                            textAlign: {
                                xs: "center",
                                md: isRTL ? "right" : "left",
                            },

                            justifySelf: {
                                xs: "center",
                                md: isRTL ? "end" : "start",
                            },

                            direction: isRTL ? "rtl" : "ltr",
                        }}
                    >
                        <Typography
                            component="h1"
                            sx={{
                                color: isDark
                                    ? "#FFFFFF"
                                    : "#24113F",

                                fontWeight: 700,

                                fontSize: {
                                    xs: "1.8rem",
                                    sm: "2.1rem",
                                    md: "2.5rem",
                                    lg: "2.7rem",
                                    xl: "3rem",
                                },

                                lineHeight: 1.25,
                                margin: 0,
                            }}
                        >
                            {t("home.heroLine1")}{" "}
                            <Box
                                component="span"
                                sx={{
                                    color: "#FFB07C",
                                }}
                            >
                                {t("home.heroLine2")}
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                color: isDark
                                    ? "rgba(255,255,255,.78)"
                                    : "rgba(36,17,63,.70)",

                                fontSize: {
                                    xs: "14px",
                                    sm: "15px",
                                    lg: "16px",
                                },

                                lineHeight: 1.8,

                                mt: 2.5,
                                mb: 4,

                                maxWidth: 420,

                                ml: {
                                    xs: "auto",
                                    md: isRTL ? "auto" : 0,
                                },

                                mr: {
                                    xs: "auto",
                                    md: isRTL ? 0 : "auto",
                                },
                            }}
                        >
                            {t("home.heroDescription")}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,

                                justifyContent: {
                                    xs: "center",
                                    md: isRTL
                                        ? "flex-end"
                                        : "flex-start",
                                },

                                flexWrap: "wrap",

                                direction: isRTL ? "rtl" : "ltr",
                            }}
                        >
                            <Button
                                onClick={() => navigate("/products")}
                                sx={{
                                    width: {
                                        xs: 155,
                                        sm: 170,
                                    },

                                    height: 46,

                                    borderRadius: "50px",

                                    background: "#FFB07C",

                                    color: "#432100",

                                    fontWeight: 700,

                                    textTransform: "none",

                                    fontSize: "15px",

                                    boxShadow:
                                        "0 8px 25px rgba(255,176,124,0.20)",

                                    "&:hover": {
                                        background: "#ffc199",
                                    },
                                }}
                            >
                                {t("home.shopCollection")}
                            </Button>

                            <Button
                                onClick={() => navigate("/products")}
                                sx={{
                                    width: {
                                        xs: 155,
                                        sm: 170,
                                    },

                                    height: 46,

                                    borderRadius: "50px",

                                    background: isDark
                                        ? "rgba(255,255,255,.08)"
                                        : "rgba(110,43,255,.08)",

                                    border: isDark
                                        ? "1px solid rgba(255,255,255,.2)"
                                        : "1px solid rgba(110,43,255,.25)",

                                    color: isDark
                                        ? "#FFFFFF"
                                        : "#5A20C8",

                                    fontWeight: 500,

                                    textTransform: "none",

                                    fontSize: "15px",

                                    "&:hover": {
                                        background: isDark
                                            ? "rgba(255,255,255,.15)"
                                            : "rgba(110,43,255,.14)",
                                    },
                                }}
                            >
                                {t("home.viewAll")}
                            </Button>
                        </Box>
                    </Box>

                    {/* ================= HERO IMAGE =================
                        English (isRTL false): RIGHT column (order 2)
                        Arabic  (isRTL true):  LEFT column (order 1)
                    */}

                    <Box
                        sx={{
                            width: "100%",

                            order: {
                                xs: 2,
                                md: isRTL ? 1 : 2,
                            },

                            display: "flex",

                            justifyContent: {
                                xs: "center",
                                md: isRTL ? "flex-start" : "flex-end",
                            },

                            // Cancel the max-width wrapper's own
                            // auto-centering margin so the oversized
                            // image bleeds flush to the section's real
                            // edge (left in RTL, right in LTR) instead
                            // of stopping short inside empty margin
                            // space. Using vw-based calc (not a fixed
                            // px guess) keeps this correct at any
                            // screen width, and applying the exact
                            // same formula on both sides guarantees
                            // symmetric mirroring between languages.
                            mr: {
                                md: isRTL
                                    ? 0
                                    : "calc(-1 * max(0px, (100vw - 1450px) / 2))",
                            },

                            ml: {
                                md: isRTL
                                    ? "calc(-1 * max(0px, (100vw - 1450px) / 2))"
                                    : 0,
                            },

                            alignItems: "center",

                            overflow: "visible",

                            position: "relative",

                            direction: "ltr",

                            "&::before": {
                                content: '""',
                                position: "absolute",

                                width: {
                                    xs: "260px",
                                    sm: "350px",
                                    md: "480px",
                                    lg: "600px",
                                },

                                height: {
                                    xs: "260px",
                                    sm: "350px",
                                    md: "480px",
                                    lg: "600px",
                                },

                                borderRadius: "50%",

                                background: isDark
                                    ? "rgba(255,176,124,0.08)"
                                    : "rgba(110,43,255,0.06)",

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

                                width: {
                                    xs: "100%",
                                    sm: "100%",
                                    md: "135%",
                                    lg: "145%",
                                    xl: "150%",
                                },

                                maxWidth: {
                                    xs: "430px",
                                    sm: "520px",
                                    md: "720px",
                                    lg: "800px",
                                    xl: "900px",
                                },

                                height: "auto",

                                objectFit: "contain",
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* =========================================================
                TRUST BAR
            ========================================================= */}

            <Box
                component="section"
                sx={{
                    backgroundColor: isDark
                        ? "#170B22"
                        : "#FFFFFF",

                    borderBottom: isDark
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(36,17,63,0.08)",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1450px",
                        mx: "auto",

                        px: {
                            xs: 2.5,
                            sm: 4,
                            md: 6,
                            lg: 8,
                        },

                        py: {
                            xs: 3,
                            md: 3.5,
                        },

                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr 1fr",
                            md: "repeat(4, 1fr)",
                        },

                        gap: {
                            xs: 2.5,
                            sm: 3,
                            md: 0,
                        },

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

                                    justifyContent: {
                                        xs: "flex-start",
                                        md: "center",
                                    },

                                    gap: 1.5,

                                    px: {
                                        xs: 1,
                                        md: 2,
                                    },

                                    py: {
                                        xs: 1,
                                        md: 0,
                                    },

                                    borderRight: {
                                        md:
                                            !isRTL && index !== 3
                                                ? isDark
                                                    ? "1px solid rgba(255,255,255,0.08)"
                                                    : "1px solid rgba(36,17,63,0.08)"
                                                : "none",
                                    },

                                    borderLeft: {
                                        md:
                                            isRTL && index !== 3
                                                ? isDark
                                                    ? "1px solid rgba(255,255,255,0.08)"
                                                    : "1px solid rgba(36,17,63,0.08)"
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

                                        backgroundColor: isDark
                                            ? "rgba(255,176,124,0.10)"
                                            : "rgba(110,43,255,0.08)",

                                        color: isDark
                                            ? "#FFB07C"
                                            : "#6E2BFF",
                                    }}
                                >
                                    <Icon sx={{ fontSize: 22 }} />
                                </Box>

                                <Box
                                    sx={{
                                        direction: isRTL
                                            ? "rtl"
                                            : "ltr",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: {
                                                xs: "13px",
                                                sm: "14px",
                                            },

                                            fontWeight: 700,

                                            color: isDark
                                                ? "#FFFFFF"
                                                : "#24113F",

                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "block",
                                            },

                                            mt: 0.4,

                                            fontSize: "12px",

                                            color: isDark
                                                ? "rgba(255,255,255,0.55)"
                                                : "rgba(36,17,63,0.55)",

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

            {/* =========================================================
                CATEGORIES
            ========================================================= */}

            <Box
                component="section"
                sx={{
                    backgroundColor: isDark
                        ? "#100817"
                        : "#FAF8FF",

                    py: {
                        xs: 6,
                        sm: 7,
                        md: 8,
                    },

                    px: {
                        xs: 2.5,
                        sm: 4,
                        md: 6,
                        lg: 8,
                    },

                    direction: isRTL ? "rtl" : "ltr",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1450px",
                        mx: "auto",
                    }}
                >
                    {/* Categories Header */}

                    <Box
                        sx={{
                            display: "flex",

                            alignItems: {
                                xs: "flex-start",
                                sm: "center",
                            },

                            justifyContent: "space-between",

                            gap: 2,

                            mb: 4,

                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },

                            direction: isRTL ? "rtl" : "ltr",
                        }}
                    >
                        <Box
                            sx={{
                                textAlign: {
                                    xs: isRTL ? "right" : "left",
                                    sm: isRTL ? "right" : "left",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: isDark
                                        ? "#FFFFFF"
                                        : "#24113F",

                                    fontSize: {
                                        xs: "1.7rem",
                                        md: "2.1rem",
                                    },

                                    fontWeight: 700,

                                    lineHeight: 1.2,

                                    mb: 1,
                                }}
                            >
                                {t("home.categoriesTitle")}
                            </Typography>

                            <Typography
                                sx={{
                                    color: isDark
                                        ? "rgba(255,255,255,0.60)"
                                        : "rgba(36,17,63,0.60)",

                                    fontSize: "14px",
                                }}
                            >
                                {t("home.categoriesSubtitle")}
                            </Typography>
                        </Box>

                        <Button
                            onClick={() => navigate("/products")}
                            sx={{
                                color: isDark
                                    ? "#FFB07C"
                                    : "#6E2BFF",

                                fontWeight: 700,

                                textTransform: "none",

                                whiteSpace: "nowrap",

                                display: "flex",

                                gap: 0.5,
                            }}
                        >
                            {t("home.viewAll")}

                            <ArrowForwardIcon
                                fontSize="small"
                                sx={{
                                    transform: isRTL
                                        ? "rotate(180deg)"
                                        : "none",
                                }}
                            />
                        </Button>
                    </Box>

                    {/* Category Cards */}

                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                xs: "repeat(2, 1fr)",
                                sm: "repeat(4, 1fr)",
                            },

                            gap: {
                                xs: 2,
                                sm: 2.5,
                                md: 3,
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <Box
                                key={category.title}
                                onClick={() => navigate("/products")}
                                sx={{
                                    cursor: "pointer",

                                    backgroundColor: isDark
                                        ? "#1B1024"
                                        : "#FFFFFF",

                                    border: isDark
                                        ? "1px solid rgba(255,255,255,0.07)"
                                        : "1px solid rgba(36,17,63,0.07)",

                                    borderRadius: "18px",

                                    minHeight: {
                                        xs: 150,
                                        sm: 180,
                                    },

                                    display: "flex",

                                    flexDirection: "column",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    gap: 1.5,

                                    transition:
                                        "transform 0.25s ease, box-shadow 0.25s ease",

                                    "&:hover": {
                                        transform:
                                            "translateY(-5px)",

                                        boxShadow: isDark
                                            ? "0 15px 35px rgba(0,0,0,0.25)"
                                            : "0 15px 35px rgba(36,17,63,0.10)",
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={category.image}
                                    alt={category.title}
                                    sx={{
                                        width: {
                                            xs: 65,
                                            sm: 80,
                                        },

                                        height: {
                                            xs: 65,
                                            sm: 80,
                                        },

                                        objectFit: "contain",

                                        display: "block",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: isDark
                                            ? "#FFFFFF"
                                            : "#24113F",

                                        fontWeight: 700,

                                        fontSize: {
                                            xs: "13px",
                                            sm: "15px",
                                        },

                                        textAlign: "center",
                                    }}
                                >
                                    {category.title}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* =========================================================
                FEATURED PRODUCTS
            ========================================================= */}

            <Box
                component="section"
                sx={{
                    backgroundColor: isDark
                        ? "#100817"
                        : "#FAF8FF",

                    py: {
                        xs: 7,
                        sm: 8,
                        md: 10,
                    },

                    px: {
                        xs: 2.5,
                        sm: 4,
                        md: 6,
                        lg: 8,
                    },

                    direction: isRTL ? "rtl" : "ltr",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1450px",
                        mx: "auto",
                    }}
                >
                    {/* Header */}

                    <Box
                        sx={{
                            display: "flex",

                            alignItems: {
                                xs: "flex-start",
                                sm: "flex-end",
                            },

                            justifyContent: "space-between",

                            gap: 3,

                            mb: {
                                xs: 4,
                                md: 5,
                            },

                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },

                            direction: isRTL
                                ? "rtl"
                                : "ltr",
                        }}
                    >
                        <Box
                            sx={{
                                textAlign: {
                                    xs: isRTL ? "right" : "left",
                                    sm: isRTL ? "right" : "left",
                                },

                                width: {
                                    xs: "100%",
                                    sm: "auto",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: isDark
                                        ? "#FFFFFF"
                                        : "#24113F",

                                    fontSize: {
                                        xs: "1.8rem",
                                        md: "2.2rem",
                                    },

                                    fontWeight: 700,

                                    lineHeight: 1.2,

                                    mb: 1,
                                }}
                            >
                                {t("home.featuredTitle")}
                            </Typography>

                            <Typography
                                sx={{
                                    color: isDark
                                        ? "rgba(255,255,255,0.60)"
                                        : "rgba(36,17,63,0.60)",

                                    fontSize: "14px",
                                }}
                            >
                                {t("home.featuredSubtitle")}
                            </Typography>
                        </Box>

                        <Button
                            onClick={() =>
                                navigate("/products")
                            }
                            sx={{
                                color: isDark
                                    ? "#FFB07C"
                                    : "#6E2BFF",

                                fontWeight: 700,

                                textTransform: "none",

                                whiteSpace: "nowrap",

                                display: "flex",

                                gap: 0.5,
                            }}
                        >
                            {t("home.viewAll")}

                            <ArrowForwardIcon
                                fontSize="small"
                                sx={{
                                    transform: isRTL
                                        ? "rotate(180deg)"
                                        : "none",
                                }}
                            />
                        </Button>
                    </Box>

                    {/* Loading */}

                    {isLoading ? (
                        <Box
                            sx={{
                                minHeight: 300,

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress
                                sx={{
                                    color: isDark
                                        ? "#FFB07C"
                                        : "#6E2BFF",
                                }}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "grid",

                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    lg: "repeat(4, 1fr)",
                                },

                                gap: {
                                    xs: 2.5,
                                    md: 3,
                                },

                                direction: isRTL ? "rtl" : "ltr",
                            }}
                        >
                            {featuredProducts.map(
                                (product) => (
                                    <Box
                                        key={product.id}
                                        onClick={() =>
                                            navigate(
                                                `/product/${product.id}`
                                            )
                                        }
                                        sx={{
                                            backgroundColor:
                                                isDark
                                                    ? "#1B1024"
                                                    : "#FFFFFF",

                                            border: isDark
                                                ? "1px solid rgba(255,255,255,0.07)"
                                                : "1px solid rgba(36,17,63,0.07)",

                                            borderRadius:
                                                "20px",

                                            overflow:
                                                "hidden",

                                            cursor: "pointer",

                                            transition:
                                                "transform 0.25s ease, box-shadow 0.25s ease",

                                            boxShadow:
                                                isDark
                                                    ? "0 12px 35px rgba(0,0,0,0.25)"
                                                    : "0 12px 35px rgba(36,17,63,0.08)",

                                            "&:hover":
                                                {
                                                    transform:
                                                        "translateY(-5px)",

                                                    boxShadow:
                                                        isDark
                                                            ? "0 18px 45px rgba(0,0,0,0.35)"
                                                            : "0 18px 45px rgba(36,17,63,0.13)",
                                                },
                                        }}
                                    >
                                        {/* Product Image */}

                                        <Box
                                            sx={{
                                                position:
                                                    "relative",

                                                height: {
                                                    xs: 260,
                                                    sm: 270,
                                                    md: 280,
                                                    lg: 290,
                                                },

                                                backgroundColor:
                                                    isDark
                                                        ? "#24132F"
                                                        : "#F6F3FA",

                                                display:
                                                    "flex",

                                                alignItems:
                                                    "center",

                                                justifyContent:
                                                    "center",

                                                overflow:
                                                    "hidden",

                                                p: 0,
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={
                                                    product.image
                                                }
                                                alt={
                                                    product.name
                                                }
                                                sx={{
                                                    width:
                                                        "100%",

                                                    height:
                                                        "100%",

                                                    objectFit:
                                                        "cover",

                                                    objectPosition:
                                                        "center",

                                                    display:
                                                        "block",

                                                    transition:
                                                        "transform 0.3s ease",

                                                    ".MuiBox-root:hover &":
                                                        {
                                                            transform:
                                                                "scale(1.05)",
                                                        },
                                                }}
                                            />

                                            {/* Favorite */}

                                            <Box
                                                onClick={(
                                                    e
                                                ) => {
                                                    e.stopPropagation()

                                                    toggleFavorite(
                                                        product.id
                                                    )
                                                }}
                                                sx={{
                                                    position:
                                                        "absolute",

                                                    top: 12,

                                                    right:
                                                        isRTL
                                                            ? "auto"
                                                            : 12,

                                                    left:
                                                        isRTL
                                                            ? 12
                                                            : "auto",

                                                    width: 38,

                                                    height: 38,

                                                    borderRadius:
                                                        "50%",

                                                    display:
                                                        "flex",

                                                    alignItems:
                                                        "center",

                                                    justifyContent:
                                                        "center",

                                                    backgroundColor:
                                                        "rgba(20,15,25,0.55)",

                                                    backdropFilter:
                                                        "blur(8px)",
                                                }}
                                            >
                                                {favorites[
                                                    product.id
                                                ] ? (
                                                    <FavoriteIcon
                                                        sx={{
                                                            color: "#FFB07C",
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                ) : (
                                                    <FavoriteBorderIcon
                                                        sx={{
                                                            color: "#FFFFFF",
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>

                                        {/* Product Information */}

                                        <Box
                                            sx={{
                                                p: 2.5,

                                                direction:
                                                    isRTL
                                                        ? "rtl"
                                                        : "ltr",
                                            }}
                                        >
                                            {/* Name + Rating */}

                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",

                                                    justifyContent:
                                                        "space-between",

                                                    alignItems:
                                                        "flex-start",

                                                    gap: 1,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: isDark
                                                            ? "#FFFFFF"
                                                            : "#24113F",

                                                        fontWeight:
                                                            600,

                                                        fontSize:
                                                            "15px",

                                                        lineHeight:
                                                            1.4,

                                                        display:
                                                            "-webkit-box",

                                                        WebkitLineClamp:
                                                            2,

                                                        WebkitBoxOrient:
                                                            "vertical",

                                                        overflow:
                                                            "hidden",

                                                        textAlign:
                                                            isRTL
                                                                ? "right"
                                                                : "left",
                                                    }}
                                                >
                                                    {
                                                        product.name
                                                    }
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",

                                                        alignItems:
                                                            "center",

                                                        gap: 0.3,

                                                        flexShrink:
                                                            0,

                                                        direction:
                                                            "ltr",
                                                    }}
                                                >
                                                    <StarIcon
                                                        sx={{
                                                            color: "#FFB07C",
                                                            fontSize: 17,
                                                        }}
                                                    />

                                                    <Typography
                                                        sx={{
                                                            color: "#FFB07C",

                                                            fontSize:
                                                                "13px",

                                                            fontWeight:
                                                                600,
                                                        }}
                                                    >
                                                        {
                                                            product.rate
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Price + Cart */}

                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",

                                                    alignItems:
                                                        "center",

                                                    justifyContent:
                                                        "space-between",

                                                    gap: 1,

                                                    mt: 2.5,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: isDark
                                                            ? "#FFB07C"
                                                            : "#6E2BFF",

                                                        fontSize:
                                                            "18px",

                                                        fontWeight:
                                                            700,

                                                        direction:
                                                            "ltr",
                                                    }}
                                                >
                                                    $
                                                    {
                                                        product.price
                                                    }
                                                </Typography>

                                                <Button
                                                    onClick={(
                                                        e
                                                    ) => {
                                                        e.stopPropagation()

                                                        handleAddToCart(
                                                            product.id
                                                        )
                                                    }}
                                                    startIcon={
                                                        <ShoppingCartOutlinedIcon fontSize="small" />
                                                    }
                                                    sx={{
                                                        minWidth:
                                                            0,

                                                        px: 1.5,

                                                        py: 0.8,

                                                        borderRadius:
                                                            "10px",

                                                        backgroundColor:
                                                            isDark
                                                                ? "rgba(255,176,124,0.10)"
                                                                : "rgba(110,43,255,0.08)",

                                                        color: isDark
                                                            ? "#FFB07C"
                                                            : "#6E2BFF",

                                                        fontSize:
                                                            "12px",

                                                        fontWeight:
                                                            700,

                                                        textTransform:
                                                            "none",

                                                        "&:hover":
                                                            {
                                                                backgroundColor:
                                                                    isDark
                                                                        ? "rgba(255,176,124,0.18)"
                                                                        : "rgba(110,43,255,0.14)",
                                                            },
                                                    }}
                                                >
                                                    {t(
                                                        "products.addToCart"
                                                    )}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            )}
                        </Box>
                    )}
                </Box>
            </Box>

            {/* =========================================================
    BEST SELLERS
========================================================= */}

<Box
    component="section"
    sx={{
        backgroundColor: isDark ? "#100817" : "#FAF8FF",

        py: {
            xs: 7,
            sm: 8,
            md: 10,
        },

        px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
        },

        direction: isRTL ? "rtl" : "ltr",
    }}
>
    <Box
        sx={{
            maxWidth: "1450px",
            mx: "auto",
        }}
    >
        {/* ================= HEADER ================= */}

        <Box
            sx={{
                display: "flex",

                alignItems: {
                    xs: "flex-start",
                    md: "center",
                },

                justifyContent: "space-between",

                gap: 3,

                mb: {
                    xs: 4,
                    md: 5,
                },

                flexDirection: {
                    xs: "column",
                    md: "row",
                },

                direction: isRTL ? "rtl" : "ltr",
            }}
        >
            <Box
                sx={{
                    textAlign: {
                        xs: "center",
                        md: isRTL ? "right" : "left",
                    },

                    width: {
                        xs: "100%",
                        md: "auto",
                    },
                }}
            >
                <Typography
                    sx={{
                        color: isDark
                            ? "#FFB07C"
                            : "#6E2BFF",

                        fontSize: "12px",

                        fontWeight: 800,

                        letterSpacing: "1.5px",

                        textTransform: "uppercase",

                        mb: 1,
                    }}
                >
                    
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "#FFFFFF"
                            : "#24113F",

                        fontSize: {
                            xs: "1.8rem",
                            md: "2.2rem",
                        },

                        fontWeight: 700,

                        lineHeight: 1.2,

                        mb: 1,
                    }}
                >
                    {t("home.bestSellersTitle")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "rgba(255,255,255,0.60)"
                            : "rgba(36,17,63,0.60)",

                        fontSize: "14px",

                        maxWidth: 550,

                        mx: {
                            xs: "auto",
                            md: 0,
                        },
                    }}
                >
                    {t("home.bestSellersSubtitle")}
                </Typography>
            </Box>

            {/* View All */}

            <Button
                onClick={() => navigate("/products")}
                sx={{
                    color: isDark
                        ? "#FFB07C"
                        : "#6E2BFF",

                    fontWeight: 700,

                    textTransform: "none",

                    whiteSpace: "nowrap",

                    display: "flex",

                    gap: 0.5,

                    alignSelf: {
                        xs: "center",
                        md: "auto",
                    },

                    "&:hover": {
                        backgroundColor: isDark
                            ? "rgba(255,176,124,0.08)"
                            : "rgba(110,43,255,0.06)",
                    },
                }}
            >
                {t("home.viewAll")}

                <ArrowForwardIcon
                    fontSize="small"
                    sx={{
                        transform: isRTL
                            ? "rotate(180deg)"
                            : "none",
                    }}
                />
            </Button>
        </Box>

        {/* ================= PRODUCTS ================= */}

        {isLoading ? (
            <Box
                sx={{
                    minHeight: 300,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",
                }}
            >
                <CircularProgress
                    sx={{
                        color: isDark
                            ? "#FFB07C"
                            : "#6E2BFF",
                    }}
                />
            </Box>
        ) : (
            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    },

                    gap: {
                        xs: 3,
                        md: 3.5,
                    },

                    direction: isRTL ? "rtl" : "ltr",
                }}
            >
                {featuredProducts.slice(0, 3).map(
                    (product, index) => (
                        <Box
                            key={product.id}
                            onClick={() =>
                                navigate(
                                    `/product/${product.id}`
                                )
                            }
                            sx={{
                                position: "relative",

                                backgroundColor: isDark
                                    ? "#1B1024"
                                    : "#FFFFFF",

                                border: isDark
                                    ? "1px solid rgba(255,255,255,0.07)"
                                    : "1px solid rgba(36,17,63,0.07)",

                                borderRadius: "20px",

                                overflow: "hidden",

                                cursor: "pointer",

                                transition:
                                    "transform 0.25s ease, box-shadow 0.25s ease",

                                boxShadow: isDark
                                    ? "0 12px 35px rgba(0,0,0,0.25)"
                                    : "0 12px 35px rgba(36,17,63,0.08)",

                                "&:hover": {
                                    transform:
                                        "translateY(-6px)",

                                    boxShadow: isDark
                                        ? "0 20px 50px rgba(0,0,0,0.38)"
                                        : "0 20px 50px rgba(36,17,63,0.14)",
                                },
                            }}
                        >
                            {/* ================= IMAGE ================= */}

                            <Box
                                sx={{
                                    position: "relative",

                                    height: {
                                        xs: 260,
                                        sm: 250,
                                        md: 270,
                                    },

                                    backgroundColor: isDark
                                        ? "#24132F"
                                        : "#F6F3FA",

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={product.image}
                                    alt={product.name}
                                    sx={{
                                        width: "100%",

                                        height: "100%",

                                        objectFit: "cover",

                                        objectPosition: "center",

                                        p: 0,

                                        display: "block",

                                        transition:
                                            "transform 0.3s ease",

                                        ".MuiBox-root:hover &": {
                                            transform:
                                                "scale(1.04)",
                                        },
                                    }}
                                />

                                {/* BEST SELLER BADGE */}

                                <Box
                                    sx={{
                                        position:
                                            "absolute",

                                        top: 14,

                                        left: isRTL
                                            ? "auto"
                                            : 14,

                                        right: isRTL
                                            ? 14
                                            : "auto",

                                        px: 1.5,

                                        py: 0.7,

                                        borderRadius:
                                            "20px",

                                        backgroundColor:
                                            isDark
                                                ? "#FFB07C"
                                                : "#6E2BFF",

                                        color:
                                            isDark
                                                ? "#432100"
                                                : "#FFFFFF",

                                        fontSize: "11px",

                                        fontWeight: 800,

                                        boxShadow:
                                            "0 6px 18px rgba(0,0,0,0.15)",

                                        zIndex: 2,
                                    }}
                                >
                                    {t(
                                        "home.bestSellerBadge"
                                    )}
                                </Box>

                                {/* RANK */}

                                <Box
                                    sx={{
                                        position:
                                            "absolute",

                                        bottom: 14,

                                        left: isRTL
                                            ? "auto"
                                            : 14,

                                        right: isRTL
                                            ? 14
                                            : "auto",

                                        width: 34,

                                        height: 34,

                                        borderRadius:
                                            "50%",

                                        display: "flex",

                                        alignItems:
                                            "center",

                                        justifyContent:
                                            "center",

                                        backgroundColor:
                                            "rgba(20,15,25,0.65)",

                                        backdropFilter:
                                            "blur(8px)",

                                        color: "#FFFFFF",

                                        fontSize: "13px",

                                        fontWeight: 800,

                                        zIndex: 2,
                                    }}
                                >
                                    #{index + 1}
                                </Box>

                                {/* FAVORITE */}

                                <Box
                                    onClick={(e) => {
                                        e.stopPropagation()

                                        toggleFavorite(
                                            product.id
                                        )
                                    }}
                                    sx={{
                                        position:
                                            "absolute",

                                        top: 14,

                                        right: isRTL
                                            ? "auto"
                                            : 14,

                                        left: isRTL
                                            ? 14
                                            : "auto",

                                        width: 40,

                                        height: 40,

                                        borderRadius:
                                            "50%",

                                        display: "flex",

                                        alignItems:
                                            "center",

                                        justifyContent:
                                            "center",

                                        backgroundColor:
                                            "rgba(20,15,25,0.55)",

                                        backdropFilter:
                                            "blur(8px)",

                                        zIndex: 3,

                                        transition:
                                            "all 0.2s ease",

                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(20,15,25,0.75)",

                                            transform:
                                                "scale(1.05)",
                                        },
                                    }}
                                >
                                    {favorites[
                                        product.id
                                    ] ? (
                                        <FavoriteIcon
                                            sx={{
                                                color:
                                                    "#FFB07C",

                                                fontSize: 20,
                                            }}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon
                                            sx={{
                                                color:
                                                    "#FFFFFF",

                                                fontSize: 20,
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>

                            {/* ================= CONTENT ================= */}

                            <Box
                                sx={{
                                    p: 2.5,

                                    direction: isRTL
                                        ? "rtl"
                                        : "ltr",
                                }}
                            >
                                {/* Product Name + Rating */}

                                <Box
                                    sx={{
                                        display:
                                            "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "flex-start",

                                        gap: 2,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: isDark
                                                ? "#FFFFFF"
                                                : "#24113F",

                                            fontWeight: 600,

                                            fontSize:
                                                "16px",

                                            lineHeight:
                                                1.4,

                                            flex: 1,

                                            display:
                                                "-webkit-box",

                                            WebkitLineClamp:
                                                2,

                                            WebkitBoxOrient:
                                                "vertical",

                                            overflow:
                                                "hidden",

                                            textAlign:
                                                isRTL
                                                    ? "right"
                                                    : "left",
                                        }}
                                    >
                                        {product.name}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display:
                                                "flex",

                                            alignItems:
                                                "center",

                                            gap: 0.4,

                                            flexShrink: 0,

                                            direction:
                                                "ltr",
                                        }}
                                    >
                                        <StarIcon
                                            sx={{
                                                color:
                                                    "#FFB07C",

                                                fontSize: 18,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                color:
                                                    "#FFB07C",

                                                fontSize:
                                                    "13px",

                                                fontWeight:
                                                    700,
                                            }}
                                        >
                                            {product.rate}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Divider */}

                                <Box
                                    sx={{
                                        height: "1px",

                                        backgroundColor:
                                            isDark
                                                ? "rgba(255,255,255,0.07)"
                                                : "rgba(36,17,63,0.07)",

                                        my: 2,
                                    }}
                                />

                                {/* Price + Cart */}

                                <Box
                                    sx={{
                                        display:
                                            "flex",

                                        alignItems:
                                            "center",

                                        justifyContent:
                                            "space-between",

                                        gap: 2,

                                        direction:
                                            isRTL
                                                ? "rtl"
                                                : "ltr",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                color:
                                                    isDark
                                                        ? "#FFB07C"
                                                        : "#6E2BFF",

                                                fontSize:
                                                    "20px",

                                                fontWeight:
                                                    800,

                                                direction:
                                                    "ltr",

                                                textAlign:
                                                    isRTL
                                                        ? "right"
                                                        : "left",
                                            }}
                                        >
                                            $
                                            {
                                                product.price
                                            }
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color:
                                                    isDark
                                                        ? "rgba(255,255,255,0.45)"
                                                        : "rgba(36,17,63,0.45)",

                                                fontSize:
                                                    "11px",

                                                mt: 0.3,
                                            }}
                                        >
                                            {t(
                                                "home.bestSellerPopular"
                                            )}
                                        </Typography>
                                    </Box>

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation()

                                            handleAddToCart(
                                                product.id
                                            )
                                        }}
                                        startIcon={
                                            <ShoppingCartOutlinedIcon fontSize="small" />
                                        }
                                        sx={{
                                            minWidth: 0,

                                            px: 1.8,

                                            py: 1,

                                            borderRadius:
                                                "11px",

                                            backgroundColor:
                                                isDark
                                                    ? "rgba(255,176,124,0.10)"
                                                    : "rgba(110,43,255,0.08)",

                                            color:
                                                isDark
                                                    ? "#FFB07C"
                                                    : "#6E2BFF",

                                            fontSize:
                                                "12px",

                                            fontWeight:
                                                700,

                                            textTransform:
                                                "none",

                                            whiteSpace:
                                                "nowrap",

                                            "&:hover": {
                                                backgroundColor:
                                                    isDark
                                                        ? "rgba(255,176,124,0.18)"
                                                        : "rgba(110,43,255,0.14)",
                                            },
                                        }}
                                    >
                                        {t(
                                            "products.addToCart"
                                        )}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )
                )}
            </Box>
        )}
    </Box>
</Box>

{/* ========================= PROMOTIONAL BANNER ========================= */}

<Box
    component="section"
    sx={{
        backgroundColor: isDark
            ? "#100817"
            : "#FAF8FF",

        px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
        },

        py: {
            xs: 4,
            md: 5,
        },

        direction: isRTL ? "rtl" : "ltr",
    }}
>
    <Box
        sx={{
            maxWidth: "1450px",
            mx: "auto",

            position: "relative",

            overflow: "hidden",

            borderRadius: {
                xs: "22px",
                md: "28px",
            },

            backgroundColor: isDark
                ? "#100817"
                : "#FAF8FF",

            border: isDark
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid rgba(110,43,255,0.08)",

            boxShadow: isDark
                ? "0 20px 50px rgba(0,0,0,0.25)"
                : "0 20px 50px rgba(36,17,63,0.08)",

            minHeight: {
                xs: 360,
                sm: 320,
                md: 300,
            },

            display: "flex",

            alignItems: "center",
        }}
    >

        {/* ================= DECORATIVE CIRCLES ================= */}

        <Box
            sx={{
                position: "absolute",

                width: {
                    xs: 180,
                    md: 280,
                },

                height: {
                    xs: 180,
                    md: 280,
                },

                borderRadius: "50%",

                background: isDark
                    ? "rgba(255,176,124,0.08)"
                    : "rgba(110,43,255,0.07)",

                top: {
                    xs: -80,
                    md: -120,
                },

                right: isRTL
                    ? "auto"
                    : {
                          xs: -80,
                          md: -120,
                      },

                left: isRTL
                    ? {
                          xs: -80,
                          md: -120,
                      }
                    : "auto",

                pointerEvents: "none",
            }}
        />

        <Box
            sx={{
                position: "absolute",

                width: {
                    xs: 120,
                    md: 190,
                },

                height: {
                    xs: 120,
                    md: 190,
                },

                borderRadius: "50%",

                background: isDark
                    ? "rgba(255,176,124,0.08)"
                    : "rgba(110,43,255,0.07)",

                bottom: {
                    xs: -60,
                    md: -80,
                },

                left: isRTL
                    ? "auto"
                    : {
                          xs: -50,
                          md: -70,
                      },

                right: isRTL
                    ? {
                          xs: -50,
                          md: -70,
                      }
                    : "auto",

                pointerEvents: "none",
            }}
        />

        {/* ================= CONTENT ================= */}

        <Box
            sx={{
                width: "100%",

                px: {
                    xs: 3,
                    sm: 5,
                    md: 7,
                    lg: 9,
                },

                py: {
                    xs: 5,
                    md: 6,
                },

                display: "flex",

                alignItems: "center",

                justifyContent: "space-between",

                gap: 4,

                flexDirection: {
                    xs: "column",
                    md: "row",
                },

                textAlign: {
                    xs: "center",
                    md: isRTL ? "right" : "left",
                },

                position: "relative",

                zIndex: 1,
            }}
        >

            {/* ================= TEXT ================= */}

            <Box
                sx={{
                    maxWidth: {
                        xs: "100%",
                        md: 720,
                    },

                    flex: 1,
                }}
            >

                {/* TAG */}

                <Box
                    sx={{
                        display: "inline-flex",

                        alignItems: "center",

                        justifyContent: "center",

                        px: 1.6,

                        py: 0.7,

                        mb: 1.8,

                        borderRadius: "30px",

                        backgroundColor: isDark
                            ? "rgba(255,176,124,0.10)"
                            : "rgba(110,43,255,0.08)",

                        border: isDark
                            ? "1px solid rgba(255,176,124,0.15)"
                            : "1px solid rgba(110,43,255,0.12)",
                    }}
                >
                    <Typography
                        sx={{
                            color: isDark
                                ? "#FFB07C"
                                : "#6E2BFF",

                            fontSize: {
                                xs: "10px",
                                sm: "11px",
                            },

                            fontWeight: 800,

                            letterSpacing: "1.4px",

                            textTransform: "uppercase",
                        }}
                    >
                        {t("home.promoTag")}
                    </Typography>
                </Box>

                {/* TITLE */}

                <Typography
                    sx={{
                        color: isDark
                            ? "#FFFFFF"
                            : "#24113F",

                        fontSize: {
                            xs: "1.8rem",
                            sm: "2.1rem",
                            md: "2.6rem",
                        },

                        fontWeight: 800,

                        lineHeight: 1.15,

                        mb: 1.5,

                        maxWidth: 650,

                        mx: {
                            xs: "auto",
                            md: 0,
                        },
                    }}
                >
                    {t("home.promoTitle")}
                </Typography>

                {/* DESCRIPTION */}

                <Typography
                    sx={{
                        color: isDark
                            ? "rgba(255,255,255,0.60)"
                            : "rgba(36,17,63,0.60)",

                        fontSize: {
                            xs: "13px",
                            sm: "14px",
                        },

                        lineHeight: 1.7,

                        maxWidth: 620,

                        mx: {
                            xs: "auto",
                            md: 0,
                        },
                    }}
                >
                    {t("home.promoDescription")}
                </Typography>
            </Box>

            {/* ================= BUTTON ================= */}

            <Button
                onClick={() => navigate("/products")}
                endIcon={
                    <ArrowForwardIcon
                        fontSize="small"
                        sx={{
                            transform: isRTL
                                ? "rotate(180deg)"
                                : "none",
                        }}
                    />
                }
                sx={{
                    flexShrink: 0,

                    px: {
                        xs: 3,
                        sm: 3.5,
                    },

                    py: 1.4,

                    minWidth: {
                        xs: 150,
                        sm: 170,
                    },

                    borderRadius: "12px",

                    backgroundColor: isDark
                        ? "#FFB07C"
                        : "#6E2BFF",

                    color: isDark
                        ? "#432100"
                        : "#FFFFFF",

                    fontSize: "13px",

                    fontWeight: 800,

                    textTransform: "none",

                    boxShadow: isDark
                        ? "0 10px 25px rgba(255,176,124,0.20)"
                        : "0 10px 25px rgba(110,43,255,0.20)",

                    "&:hover": {
                        backgroundColor: isDark
                            ? "#FFC095"
                            : "#5D20E8",

                        transform: "translateY(-2px)",

                        boxShadow: isDark
                            ? "0 14px 30px rgba(255,176,124,0.28)"
                            : "0 14px 30px rgba(110,43,255,0.28)",
                    },

                    transition:
                        "all 0.25s ease",
                }}
            >
                {t("home.promoButton")}
            </Button>
        </Box>
    </Box>
</Box>


{/* ========================= CUSTOMER TESTIMONIALS ========================= */}

<Box
    component="section"
    sx={{
        backgroundColor: isDark ? "#100817" : "#FAF8FF",

        py: {
            xs: 7,
            sm: 8,
            md: 10,
        },

        px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
        },

        direction: isRTL ? "rtl" : "ltr",
    }}
>
    <Box
        sx={{
            maxWidth: "1450px",
            mx: "auto",
        }}
    >
        {/* ================= HEADER ================= */}

        <Box
            sx={{
                textAlign: "center",

                mb: {
                    xs: 4.5,
                    md: 6,
                },
            }}
        >
            <Typography
                sx={{
                    color: isDark
                        ? "#FFB07C"
                        : "#6E2BFF",

                    fontSize: "12px",

                    fontWeight: 800,

                    letterSpacing: "1.5px",

                    textTransform: "uppercase",

                    mb: 1,
                }}
            >
            </Typography>

            <Typography
                sx={{
                    color: isDark
                        ? "#FFFFFF"
                        : "#24113F",

                    fontSize: {
                        xs: "1.8rem",
                        md: "2.2rem",
                    },

                    fontWeight: 700,

                    lineHeight: 1.2,

                    mb: 1,
                }}
            >
                {t("home.testimonialsTitle")}
            </Typography>

            <Typography
                sx={{
                    color: isDark
                        ? "rgba(255,255,255,0.60)"
                        : "rgba(36,17,63,0.60)",

                    fontSize: "14px",

                    maxWidth: 600,

                    mx: "auto",

                    lineHeight: 1.7,
                }}
            >
                {t("home.testimonialsSubtitle")}
            </Typography>
        </Box>

        {/* ================= TESTIMONIALS ================= */}

        <Box
            sx={{
                display: "grid",

                gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(3, 1fr)",
                },

                gap: {
                    xs: 3,
                    md: 3.5,
                },

                direction: isRTL ? "rtl" : "ltr",
            }}
        >
            {[
                {
                    name: t("home.testimonial1Name"),
                    role: t("home.testimonial1Role"),
                    text: t("home.testimonial1Text"),
                },
                {
                    name: t("home.testimonial2Name"),
                    role: t("home.testimonial2Role"),
                    text: t("home.testimonial2Text"),
                },
                {
                    name: t("home.testimonial3Name"),
                    role: t("home.testimonial3Role"),
                    text: t("home.testimonial3Text"),
                },
            ].map((testimonial, index) => (
                <Box
                    key={index}
                    sx={{
                        backgroundColor: isDark
                            ? "#1B1024"
                            : "#FFFFFF",

                        border: isDark
                            ? "1px solid rgba(255,255,255,0.07)"
                            : "1px solid rgba(36,17,63,0.07)",

                        borderRadius: "20px",

                        p: {
                            xs: 3,
                            md: 3.5,
                        },

                        minHeight: {
                            xs: "auto",
                            md: 245,
                        },

                        display: "flex",

                        flexDirection: "column",

                        justifyContent: "space-between",

                        boxShadow: isDark
                            ? "0 12px 35px rgba(0,0,0,0.25)"
                            : "0 12px 35px rgba(36,17,63,0.07)",

                        transition:
                            "transform 0.25s ease, box-shadow 0.25s ease",

                        "&:hover": {
                            transform:
                                "translateY(-6px)",

                            boxShadow: isDark
                                ? "0 20px 50px rgba(0,0,0,0.38)"
                                : "0 20px 50px rgba(36,17,63,0.13)",
                        },

                        direction: isRTL
                            ? "rtl"
                            : "ltr",
                    }}
                >
                    {/* ================= QUOTE ICON ================= */}

                    <Box>
                        <Box
                            sx={{
                                width: 42,

                                height: 42,

                                borderRadius: "50%",

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                backgroundColor: isDark
                                    ? "rgba(255,176,124,0.10)"
                                    : "rgba(110,43,255,0.08)",

                                color: isDark
                                    ? "#FFB07C"
                                    : "#6E2BFF",

                                mb: 2,
                            }}
                        >
                            <FormatQuoteIcon
                                sx={{
                                    fontSize: 22,
                                }}
                            />
                        </Box>

                        {/* ================= REVIEW ================= */}

                        <Typography
                            sx={{
                                color: isDark
                                    ? "rgba(255,255,255,0.78)"
                                    : "rgba(36,17,63,0.75)",

                                fontSize: {
                                    xs: "13px",
                                    md: "14px",
                                },

                                lineHeight: 1.8,

                                textAlign: isRTL
                                    ? "right"
                                    : "left",
                            }}
                        >
                            "{testimonial.text}"
                        </Typography>
                    </Box>

                    {/* ================= USER ================= */}

                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <Box
                            sx={{
                                height: "1px",

                                backgroundColor: isDark
                                    ? "rgba(255,255,255,0.07)"
                                    : "rgba(36,17,63,0.07)",

                                mb: 2.5,
                            }}
                        />

                        <Box
                            sx={{
                                display: "flex",

                                alignItems: "center",

                                gap: 1.5,

                                direction: isRTL
                                    ? "rtl"
                                    : "ltr",
                            }}
                        >
                            {/* AVATAR */}

                            <Box
                                sx={{
                                    width: 42,

                                    height: 42,

                                    borderRadius: "50%",

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    backgroundColor: isDark
                                        ? "#FFB07C"
                                        : "#6E2BFF",

                                    color: isDark
                                        ? "#432100"
                                        : "#FFFFFF",

                                    fontSize: "14px",

                                    fontWeight: 800,

                                    flexShrink: 0,
                                }}
                            >
                                {testimonial.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </Box>

                            {/* NAME + ROLE */}

                            <Box
                                sx={{
                                    minWidth: 0,

                                    textAlign: isRTL
                                        ? "right"
                                        : "left",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: isDark
                                            ? "#FFFFFF"
                                            : "#24113F",

                                        fontSize: "14px",

                                        fontWeight: 700,

                                        lineHeight: 1.3,
                                    }}
                                >
                                    {testimonial.name}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: isDark
                                            ? "rgba(255,255,255,0.45)"
                                            : "rgba(36,17,63,0.45)",

                                        fontSize: "11px",

                                        mt: 0.3,
                                    }}
                                >
                                    {testimonial.role}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    </Box>
</Box>

{/* ========================= STATISTICS / SHOPLUX NUMBERS ========================= */}

<Box
    component="section"
    sx={{
        width: "100%",

        px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
        },

        py: {
            xs: 5,
            sm: 6,
            md: 7,
        },

        backgroundColor: isDark ? "#100817" : "#FAF8FF",

        direction: isRTL ? "rtl" : "ltr",
    }}
>
    <Box
        sx={{
            maxWidth: "1450px",

            mx: "auto",

            backgroundColor: "transparent",

            textAlign: "center",
        }}
    >
        {/* ========================= SECTION HEADER ========================= */}

        <Box
            sx={{
                mb: {
                    xs: 4,
                    md: 5,
                },

                textAlign: "center",
            }}
        >
            {/* TITLE */}

            <Typography
                component="h2"
                sx={{
                    color: isDark
                        ? "#FFFFFF"
                        : "#24113F",

                    fontSize: {
                        xs: "1.9rem",
                        sm: "2.2rem",
                        md: "2.6rem",
                    },

                    fontWeight: 800,

                    lineHeight: 1.2,

                    mb: 1.2,
                }}
            >
                {t("home.statsTitle")}
            </Typography>

            {/* SUBTITLE */}

            <Typography
                sx={{
                    color: isDark
                        ? "rgba(255,255,255,0.55)"
                        : "rgba(36,17,63,0.55)",

                    fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                    },

                    lineHeight: 1.6,

                    maxWidth: 600,

                    mx: "auto",
                }}
            >
                {t("home.statsSubtitle")}
            </Typography>
        </Box>

        {/* ========================= STATISTICS GRID ========================= */}

        <Box
            sx={{
                display: "grid",

                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                },

                gap: {
                    xs: 2.5,
                    md: 3,
                },
            }}
        >
            {/* ========================= CUSTOMERS ========================= */}

            <Box
                sx={{
                    position: "relative",

                    backgroundColor: isDark
                        ? "#1B1024"
                        : "#FFFFFF",

                    border: isDark
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(36,17,63,0.08)",

                    borderRadius: "20px",

                    p: {
                        xs: 3,
                        md: 3.5,
                    },

                    textAlign: "center",

                    overflow: "hidden",

                    transition:
                        "transform 0.25s ease, box-shadow 0.25s ease",

                    boxShadow: isDark
                        ? "0 12px 35px rgba(0,0,0,0.25)"
                        : "0 12px 35px rgba(36,17,63,0.07)",

                    "&:hover": {
                        transform: "translateY(-5px)",

                        boxShadow: isDark
                            ? "0 15px 35px rgba(0,0,0,0.18)"
                            : "0 15px 35px rgba(36,17,63,0.08)",
                    },
                }}
            >
                <Typography
                    sx={{
                        color: isDark
                            ? "#FFB07C"
                            : "#6E2BFF",

                        fontSize: {
                            xs: "2rem",
                            md: "2.3rem",
                        },

                        fontWeight: 800,

                        lineHeight: 1.1,

                        mb: 1,
                    }}
                >
                    {t("home.statsCustomersValue")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "#FFFFFF"
                            : "#24113F",

                        fontSize: "14px",

                        fontWeight: 700,

                        mb: 0.6,
                    }}
                >
                    {t("home.statsCustomersLabel")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "rgba(255,255,255,0.45)"
                            : "rgba(36,17,63,0.45)",

                        fontSize: "11px",
                    }}
                >
                    {t("home.statsCustomersDesc")}
                </Typography>
            </Box>

            {/* ========================= PRODUCTS ========================= */}

            <Box
                sx={{
                    position: "relative",

                    backgroundColor: isDark
                        ? "#1B1024"
                        : "#FFFFFF",

                    border: isDark
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(36,17,63,0.08)",

                    borderRadius: "20px",

                    p: {
                        xs: 3,
                        md: 3.5,
                    },

                    textAlign: "center",

                    overflow: "hidden",

                    transition:
                        "transform 0.25s ease, box-shadow 0.25s ease",

                    boxShadow: isDark
                        ? "0 12px 35px rgba(0,0,0,0.25)"
                        : "0 12px 35px rgba(36,17,63,0.07)",

                    "&:hover": {
                        transform: "translateY(-5px)",

                        boxShadow: isDark
                            ? "0 15px 35px rgba(0,0,0,0.18)"
                            : "0 15px 35px rgba(36,17,63,0.08)",
                    },
                }}
            >
                <Typography
                    sx={{
                        color: isDark
                            ? "#FFB07C"
                            : "#6E2BFF",

                        fontSize: {
                            xs: "2rem",
                            md: "2.3rem",
                        },

                        fontWeight: 800,

                        lineHeight: 1.1,

                        mb: 1,
                    }}
                >
                    {t("home.statsProductsValue")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "#FFFFFF"
                            : "#24113F",

                        fontSize: "14px",

                        fontWeight: 700,

                        mb: 0.6,
                    }}
                >
                    {t("home.statsProductsLabel")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "rgba(255,255,255,0.45)"
                            : "rgba(36,17,63,0.45)",

                        fontSize: "11px",
                    }}
                >
                    {t("home.statsProductsDesc")}
                </Typography>
            </Box>

            {/* ========================= COUNTRIES ========================= */}

            <Box
                sx={{
                    position: "relative",

                    backgroundColor: isDark
                        ? "#1B1024"
                        : "#FFFFFF",

                    border: isDark
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(36,17,63,0.08)",

                    borderRadius: "20px",

                    p: {
                        xs: 3,
                        md: 3.5,
                    },

                    textAlign: "center",

                    overflow: "hidden",

                    transition:
                        "transform 0.25s ease, box-shadow 0.25s ease",

                    boxShadow: isDark
                        ? "0 12px 35px rgba(0,0,0,0.25)"
                        : "0 12px 35px rgba(36,17,63,0.07)",

                    "&:hover": {
                        transform: "translateY(-5px)",

                        boxShadow: isDark
                            ? "0 15px 35px rgba(0,0,0,0.18)"
                            : "0 15px 35px rgba(36,17,63,0.08)",
                    },
                }}
            >
                <Typography
                    sx={{
                        color: isDark
                            ? "#FFB07C"
                            : "#6E2BFF",

                        fontSize: {
                            xs: "2rem",
                            md: "2.3rem",
                        },

                        fontWeight: 800,

                        lineHeight: 1.1,

                        mb: 1,
                    }}
                >
                    {t("home.statsCountriesValue")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "#FFFFFF"
                            : "#24113F",

                        fontSize: "14px",

                        fontWeight: 700,

                        mb: 0.6,
                    }}
                >
                    {t("home.statsCountriesLabel")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "rgba(255,255,255,0.45)"
                            : "rgba(36,17,63,0.45)",

                        fontSize: "11px",
                    }}
                >
                    {t("home.statsCountriesDesc")}
                </Typography>
            </Box>

            {/* ========================= RATING ========================= */}

            <Box
                sx={{
                    position: "relative",

                    backgroundColor: isDark
                        ? "#1B1024"
                        : "#FFFFFF",

                    border: isDark
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(36,17,63,0.08)",

                    borderRadius: "20px",

                    p: {
                        xs: 3,
                        md: 3.5,
                    },

                    textAlign: "center",

                    overflow: "hidden",

                    transition:
                        "transform 0.25s ease, box-shadow 0.25s ease",

                    boxShadow: isDark
                        ? "0 12px 35px rgba(0,0,0,0.25)"
                        : "0 12px 35px rgba(36,17,63,0.07)",

                    "&:hover": {
                        transform: "translateY(-5px)",

                        boxShadow: isDark
                            ? "0 15px 35px rgba(0,0,0,0.18)"
                            : "0 15px 35px rgba(36,17,63,0.08)",
                    },
                }}
            >
                <Typography
                    sx={{
                        color: isDark
                            ? "#FFB07C"
                            : "#6E2BFF",

                        fontSize: {
                            xs: "2rem",
                            md: "2.3rem",
                        },

                        fontWeight: 800,

                        lineHeight: 1.1,

                        mb: 1,
                    }}
                >
                    {t("home.statsRatingValue")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "#FFFFFF"
                            : "#24113F",

                        fontSize: "14px",

                        fontWeight: 700,

                        mb: 0.6,
                    }}
                >
                    {t("home.statsRatingLabel")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "rgba(255,255,255,0.45)"
                            : "rgba(36,17,63,0.45)",

                        fontSize: "11px",
                    }}
                >
                    {t("home.statsRatingDesc")}
                </Typography>
            </Box>
        </Box>
    </Box>
</Box>


{/* ========================= NEWSLETTER ========================= */}
 
<Box
    component="section"
    sx={{
        backgroundColor: isDark ? "#170B22" : "#FFFFFF",
 
        borderTop: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(36,17,63,0.08)",
 
        borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(36,17,63,0.08)",
 
        px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
        },
 
        py: {
            xs: 6,
            sm: 7,
            md: 8,
        },
 
        direction: isRTL ? "rtl" : "ltr",
    }}
>
    <Box
        sx={{
            maxWidth: "780px",
            mx: "auto",
            textAlign: "center",
        }}
    >
        {/* ================= ICON ================= */}
 
        <Box
            sx={{
                width: 64,
                height: 64,
 
                mx: "auto",
                mb: 3,
 
                borderRadius: "50%",
 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
 
                backgroundColor: isDark
                    ? "rgba(255,176,124,0.10)"
                    : "rgba(110,43,255,0.08)",
 
                color: isDark ? "#FFB07C" : "#6E2BFF",
            }}
        >
            <MarkEmailReadOutlinedIcon sx={{ fontSize: 30 }} />
        </Box>
 
        {/* ================= TITLE ================= */}
 
        <Typography
            component="h2"
            sx={{
                color: isDark ? "#FFFFFF" : "#24113F",
 
                fontSize: {
                    xs: "1.7rem",
                    sm: "2rem",
                    md: "2.3rem",
                },
 
                fontWeight: 800,
 
                lineHeight: 1.25,
 
                mb: 1.5,
            }}
        >
            {t("home.newsletterTitle")}
        </Typography>
 
        {/* ================= SUBTITLE ================= */}
 
        <Typography
            sx={{
                color: isDark
                    ? "rgba(255,255,255,0.60)"
                    : "rgba(36,17,63,0.60)",
 
                fontSize: {
                    xs: "13px",
                    sm: "14px",
                },
 
                lineHeight: 1.8,
 
                maxWidth: 480,
 
                mx: "auto",
 
                mb: 4,
            }}
        >
            {t("home.newsletterSubtitle")}
        </Typography>
 
        {/* ================= MERGED INPUT + BUTTON ================= */}
 
        <Box
            component="form"
            onSubmit={handleNewsletterSubmit}
            sx={{
                display: "flex",

                alignItems: "center",
 
                maxWidth: 460,
 
                mx: "auto",
 
                backgroundColor: isDark ? "#1B1024" : "#FAF8FF",
 
                border: isDark
                    ? "1px solid rgba(255,255,255,0.10)"
                    : "1px solid rgba(36,17,63,0.10)",
 
                borderRadius: "50px",
 
                p: "6px",
 
                gap: "6px",
 
                boxShadow: isDark
                    ? "0 12px 30px rgba(0,0,0,0.25)"
                    : "0 12px 30px rgba(36,17,63,0.08)",
 
                transition: "border-color 0.2s ease",
 
                "&:focus-within": {
                    borderColor: isDark
                        ? "rgba(255,176,124,0.45)"
                        : "rgba(110,43,255,0.35)",
                },
            }}
        >
            <TextField
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t("home.newsletterPlaceholder")}
                required
                fullWidth
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                }}
                inputProps={{
                    dir: isRTL ? "rtl" : "ltr",
                    style: {
                        textAlign: isRTL ? "right" : "left",
                    },
                }}
                sx={{
                    px: 2,
 
                    "& .MuiInputBase-input": {
                        color: isDark ? "#FFFFFF" : "#24113F",
                        fontSize: "14px",
 
                        "&::placeholder": {
                            color: isDark
                                ? "rgba(255,255,255,0.40)"
                                : "rgba(36,17,63,0.40)",
 
                            opacity: 1,
                        },
                    },
                }}
            />
 
            <Button
                type="submit"
                disabled={newsletterLoading}
                endIcon={
                    <SendRoundedIcon fontSize="small" />
                }
                sx={{
                    flexShrink: 0,
 
                    height: 46,
 
                    px: {
                        xs: 2.5,
                        sm: 3.2,
                    },
 
                    borderRadius: "50px",
 
                    backgroundColor: isDark ? "#FFB07C" : "#6E2BFF",
 
                    color: isDark ? "#432100" : "#FFFFFF",
 
                    fontWeight: 700,
 
                    fontSize: "13px",
 
                    textTransform: "none",
 
                    whiteSpace: "nowrap",
 
                    "&:hover": {
                        backgroundColor: isDark ? "#FFC095" : "#5D20E8",
                    },
 
                    "&.Mui-disabled": {
                        backgroundColor: isDark
                            ? "rgba(255,176,124,0.35)"
                            : "rgba(110,43,255,0.35)",
 
                        color: isDark
                            ? "rgba(67,33,0,0.6)"
                            : "#FFFFFF",
                    },
                }}
            >
                {newsletterLoading
                    ? t("home.newsletterSending")
                    : t("home.newsletterButton")}
            </Button>
        </Box>
 
        {/* ================= PRIVACY NOTE ================= */}
 
        <Typography
            sx={{
                mt: 2.5,
 
                color: isDark
                    ? "rgba(255,255,255,0.40)"
                    : "rgba(36,17,63,0.45)",
 
                fontSize: "11.5px",
            }}
        >
            {t("home.newsletterPrivacy")}
        </Typography>
    </Box>
</Box>

            {/* =========================================================
                SNACKBAR
            ========================================================= */}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar((s) => ({
                        ...s,
                        open: false,
                    }))
                }
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert
                    onClose={() =>
                        setSnackbar((s) => ({
                            ...s,
                            open: false,
                        }))
                    }
                    severity={snackbar.severity}
                    sx={{
                        width: "100%",
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}