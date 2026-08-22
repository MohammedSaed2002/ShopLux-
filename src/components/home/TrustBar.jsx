import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"

export default function TrustBar({ t, isDark, isRTL }) {
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

    return (
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
    )
}