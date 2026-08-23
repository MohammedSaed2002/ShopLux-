import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"

import { useTheme, alpha } from "@mui/material/styles"

export default function WhyChoose({ t }) {
    const theme = useTheme()
    const isDark = theme.palette.mode === "dark"

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
    ]

    return (
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
    )
}