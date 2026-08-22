import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function Statistics({
    t,
    isDark,
    isRTL,
}) {
    const statistics = [
        {
            value: t("home.statsCustomersValue"),
            label: t("home.statsCustomersLabel"),
            description: t("home.statsCustomersDesc"),
        },
        {
            value: t("home.statsProductsValue"),
            label: t("home.statsProductsLabel"),
            description: t("home.statsProductsDesc"),
        },
        {
            value: t("home.statsCountriesValue"),
            label: t("home.statsCountriesLabel"),
            description: t("home.statsCountriesDesc"),
        },
        {
            value: t("home.statsRatingValue"),
            label: t("home.statsRatingLabel"),
            description: t("home.statsRatingDesc"),
        },
    ]

    return (
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

                backgroundColor: isDark
                    ? "#100817"
                    : "#FAF8FF",

                direction: isRTL
                    ? "rtl"
                    : "ltr",
            }}
        >
            <Box
                sx={{
                    maxWidth: "1450px",
                    mx: "auto",

                    textAlign: "center",
                }}
            >

                <Box
                    sx={{
                        mb: {
                            xs: 4,
                            md: 5,
                        },

                        textAlign: "center",
                    }}
                >
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
                    {statistics.map((stat) => (
                        <Box
                            key={stat.label}
                            sx={{
                                backgroundColor:
                                    isDark
                                        ? "#1B1024"
                                        : "#FFFFFF",

                                border: isDark
                                    ? "1px solid rgba(255,255,255,0.08)"
                                    : "1px solid rgba(36,17,63,0.08)",

                                borderRadius:
                                    "20px",

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
                                    transform:
                                        "translateY(-5px)",

                                    boxShadow:
                                        isDark
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
                                {stat.value}
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
                                {stat.label}
                            </Typography>

                            <Typography
                                sx={{
                                    color: isDark
                                        ? "rgba(255,255,255,0.45)"
                                        : "rgba(36,17,63,0.45)",

                                    fontSize: "11px",
                                }}
                            >
                                {stat.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}