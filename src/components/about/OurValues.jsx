import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined"
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined"
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined"

import { useTheme, alpha } from "@mui/material/styles"

export default function OurValues({ t, isRTL }) {
    const theme = useTheme()

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
    ]

    return (
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
    )
}