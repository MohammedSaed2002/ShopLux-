import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import FormatQuoteIcon from "@mui/icons-material/FormatQuote"

export default function Testimonials({
    t,
    isDark,
    isRTL,
}) {
    const testimonials = [
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
    ]

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
                        {t(
                            "home.testimonialsSubtitle"
                        )}
                    </Typography>
                </Box>

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

                        direction: isRTL
                            ? "rtl"
                            : "ltr",
                    }}
                >
                    {testimonials.map(
                        (testimonial, index) => (
                            <Box
                                key={index}
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

                                    p: {
                                        xs: 3,
                                        md: 3.5,
                                    },

                                    minHeight: {
                                        xs: "auto",
                                        md: 245,
                                    },

                                    display: "flex",

                                    flexDirection:
                                        "column",

                                    justifyContent:
                                        "space-between",

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

                                    direction:
                                        isRTL
                                            ? "rtl"
                                            : "ltr",
                                }}
                            >

                                <Box>
                                    <Box
                                        sx={{
                                            width: 42,

                                            height: 42,

                                            borderRadius:
                                                "50%",

                                            display:
                                                "flex",

                                            alignItems:
                                                "center",

                                            justifyContent:
                                                "center",

                                            backgroundColor:
                                                isDark
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

                                            textAlign:
                                                isRTL
                                                    ? "right"
                                                    : "left",
                                        }}
                                    >
                                        "{testimonial.text}"
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        mt: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height:
                                                "1px",

                                            backgroundColor:
                                                isDark
                                                    ? "rgba(255,255,255,0.07)"
                                                    : "rgba(36,17,63,0.07)",

                                            mb: 2.5,
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            display:
                                                "flex",

                                            alignItems:
                                                "center",

                                            gap: 1.5,

                                            direction:
                                                isRTL
                                                    ? "rtl"
                                                    : "ltr",
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                width: 42,

                                                height: 42,

                                                borderRadius:
                                                    "50%",

                                                display:
                                                    "flex",

                                                alignItems:
                                                    "center",

                                                justifyContent:
                                                    "center",

                                                backgroundColor:
                                                    isDark
                                                        ? "#FFB07C"
                                                        : "#6E2BFF",

                                                color: isDark
                                                    ? "#432100"
                                                    : "#FFFFFF",

                                                fontSize:
                                                    "14px",

                                                fontWeight:
                                                    800,

                                                flexShrink:
                                                    0,
                                            }}
                                        >
                                            {testimonial.name
                                                .charAt(
                                                    0
                                                )
                                                .toUpperCase()}
                                        </Box>

                                        <Box
                                            sx={{
                                                minWidth:
                                                    0,

                                                textAlign:
                                                    isRTL
                                                        ? "right"
                                                        : "left",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: isDark
                                                        ? "#FFFFFF"
                                                        : "#24113F",

                                                    fontSize:
                                                        "14px",

                                                    fontWeight:
                                                        700,

                                                    lineHeight:
                                                        1.3,
                                                }}
                                            >
                                                {
                                                    testimonial.name
                                                }
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: isDark
                                                        ? "rgba(255,255,255,0.45)"
                                                        : "rgba(36,17,63,0.45)",

                                                    fontSize:
                                                        "11px",

                                                    mt: 0.3,
                                                }}
                                            >
                                                {
                                                    testimonial.role
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    )}
                </Box>
            </Box>
        </Box>
    )
}