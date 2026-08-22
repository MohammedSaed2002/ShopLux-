import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export default function PromoBanner({
    t,
    navigate,
    isDark,
    isRTL,
}) {
    return (
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

                        justifyContent:
                            "space-between",

                        gap: 4,

                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },

                        textAlign: {
                            xs: "center",
                            md: isRTL
                                ? "right"
                                : "left",
                        },

                        position: "relative",

                        zIndex: 1,
                    }}
                >
                    {/* Text */}

                    <Box
                        sx={{
                            maxWidth: {
                                xs: "100%",
                                md: 720,
                            },

                            flex: 1,
                        }}
                    >

                        <Box
                            sx={{
                                display: "inline-flex",

                                alignItems: "center",

                                justifyContent:
                                    "center",

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

                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                {t("home.promoTag")}
                            </Typography>
                        </Box>

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
                            {t(
                                "home.promoDescription"
                            )}
                        </Typography>
                    </Box>

                    <Button
                        onClick={() =>
                            navigate("/products")
                        }
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

                                transform:
                                    "translateY(-2px)",

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
    )
}