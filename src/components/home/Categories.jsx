import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

import beautyIcon from "../../assets/icons/Beauty.svg"
import electronicsIcon from "../../assets/icons/Electronics.svg"
import fashionIcon from "../../assets/icons/Fashion.svg"
import homeIcon from "../../assets/icons/Home.svg"

export default function Categories({
    t,
    navigate,
    isDark,
    isRTL,
}) {
    const categories = [
        {
            image: beautyIcon,
            title: t("home.categoryBeauty"),
            path: "/category/beauty",
        },
        {
            image: electronicsIcon,
            title: t("home.categoryElectronics"),
            path: "/products",
        },
        {
            image: fashionIcon,
            title: t("home.categoryFashion"),
            path: "/category/fashion",
        },
        {
            image: homeIcon,
            title: t("home.categoryHome"),
            path: "/category/home",
        },
    ]

    return (
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

                direction: isRTL
                    ? "rtl"
                    : "ltr",
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
                            sm: "center",
                        },

                        justifyContent:
                            "space-between",

                        gap: 2,

                        mb: 4,

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
                                xs: isRTL
                                    ? "right"
                                    : "left",

                                sm: isRTL
                                    ? "right"
                                    : "left",
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
                            {t(
                                "home.categoriesTitle"
                            )}
                        </Typography>

                        <Typography
                            sx={{
                                color: isDark
                                    ? "rgba(255,255,255,0.60)"
                                    : "rgba(36,17,63,0.60)",

                                fontSize: "14px",
                            }}
                        >
                            {t(
                                "home.categoriesSubtitle"
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
                    {categories.map(
                        (category) => (
                            <Box
                                key={category.title}
                                onClick={() =>
                                    navigate(
                                        category.path
                                    )
                                }
                                sx={{
                                    cursor: "pointer",

                                    backgroundColor:
                                        isDark
                                            ? "#1B1024"
                                            : "#FFFFFF",

                                    border: isDark
                                        ? "1px solid rgba(255,255,255,0.07)"
                                        : "1px solid rgba(36,17,63,0.07)",

                                    borderRadius:
                                        "18px",

                                    minHeight: {
                                        xs: 150,
                                        sm: 180,
                                    },

                                    display: "flex",

                                    flexDirection:
                                        "column",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    gap: 1.5,

                                    transition:
                                        "transform 0.25s ease, box-shadow 0.25s ease",

                                    "&:hover": {
                                        transform:
                                            "translateY(-5px)",

                                        boxShadow:
                                            isDark
                                                ? "0 15px 35px rgba(0,0,0,0.25)"
                                                : "0 15px 35px rgba(36,17,63,0.10)",
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={
                                        category.image
                                    }
                                    alt={
                                        category.title
                                    }
                                    sx={{
                                        width: {
                                            xs: 65,
                                            sm: 80,
                                        },

                                        height: {
                                            xs: 65,
                                            sm: 80,
                                        },

                                        objectFit:
                                            "contain",

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

                                        textAlign:
                                            "center",
                                    }}
                                >
                                    {
                                        category.title
                                    }
                                </Typography>
                            </Box>
                        )
                    )}
                </Box>
            </Box>
        </Box>
    )
}