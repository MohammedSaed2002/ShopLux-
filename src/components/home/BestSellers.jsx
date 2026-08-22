import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import StarIcon from "@mui/icons-material/Star"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"

export default function BestSellers({
    t,
    navigate,
    isDark,
    isRTL,
    featuredProducts,
    isLoading,
    favorites,
    toggleFavorite,
    handleAddToCart,
}) {
    return (
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

                        direction: isRTL
                            ? "rtl"
                            : "ltr",
                    }}
                >
                    <Box
                        sx={{
                            textAlign: {
                                xs: "center",
                                md: isRTL
                                    ? "right"
                                    : "left",
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

                                textTransform:
                                    "uppercase",

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
                            {t(
                                "home.bestSellersTitle"
                            )}
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
                            {t(
                                "home.bestSellersSubtitle"
                            )}
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

                            alignSelf: {
                                xs: "center",
                                md: "auto",
                            },

                            "&:hover": {
                                backgroundColor:
                                    isDark
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

                {isLoading ? (
                    <Box
                        sx={{
                            minHeight: 300,

                            display: "flex",

                            alignItems: "center",

                            justifyContent:
                                "center",
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

                            direction: isRTL
                                ? "rtl"
                                : "ltr",
                        }}
                    >
                        {featuredProducts
                            .slice(0, 3)
                            .map((product, index) => (
                                <Box
                                    key={product.id}
                                    onClick={() =>
                                        navigate(
                                            `/product/${product.id}`
                                        )
                                    }
                                    sx={{
                                        position:
                                            "relative",

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

                                        cursor:
                                            "pointer",

                                        transition:
                                            "transform 0.25s ease, box-shadow 0.25s ease",

                                        boxShadow:
                                            isDark
                                                ? "0 12px 35px rgba(0,0,0,0.25)"
                                                : "0 12px 35px rgba(36,17,63,0.08)",

                                        "&:hover": {
                                            transform:
                                                "translateY(-6px)",

                                            boxShadow:
                                                isDark
                                                    ? "0 20px 50px rgba(0,0,0,0.38)"
                                                    : "0 20px 50px rgba(36,17,63,0.14)",
                                        },
                                    }}
                                >

                                    <Box
                                        sx={{
                                            position:
                                                "relative",

                                            height: {
                                                xs: 260,
                                                sm: 250,
                                                md: 270,
                                            },

                                            backgroundColor:
                                                isDark
                                                    ? "#24132F"
                                                    : "#F6F3FA",

                                            display: "flex",

                                            alignItems:
                                                "center",

                                            justifyContent:
                                                "center",

                                            overflow:
                                                "hidden",
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
                                                width: "100%",

                                                height: "100%",

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
                                                            "scale(1.04)",
                                                    },
                                            }}
                                        />

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

                                                color: isDark
                                                    ? "#432100"
                                                    : "#FFFFFF",

                                                fontSize:
                                                    "11px",

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

                                                display:
                                                    "flex",

                                                alignItems:
                                                    "center",

                                                justifyContent:
                                                    "center",

                                                backgroundColor:
                                                    "rgba(20,15,25,0.65)",

                                                backdropFilter:
                                                    "blur(8px)",

                                                color: "#FFFFFF",

                                                fontSize:
                                                    "13px",

                                                fontWeight: 800,

                                                zIndex: 2,
                                            }}
                                        >
                                            #{index + 1}
                                        </Box>

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

                                    <Box
                                        sx={{
                                            p: 2.5,

                                            direction:
                                                isRTL
                                                    ? "rtl"
                                                    : "ltr",
                                        }}
                                    >
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

                                                    fontWeight:
                                                        600,

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

                                                    gap: 0.4,

                                                    flexShrink:
                                                        0,

                                                    direction:
                                                        "ltr",
                                                }}
                                            >
                                                <StarIcon
                                                    sx={{
                                                        color: "#FFB07C",
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
                                                    {
                                                        product.rate
                                                    }
                                                </Typography>
                                            </Box>
                                        </Box>


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

                                                    px: 1.8,

                                                    py: 1,

                                                    borderRadius:
                                                        "11px",

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

                                                    whiteSpace:
                                                        "nowrap",

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
                            ))}
                    </Box>
                )}
            </Box>
        </Box>
    )
}