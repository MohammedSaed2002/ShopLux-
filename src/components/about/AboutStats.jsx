import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"
import StarIcon from "@mui/icons-material/Star"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"

import { useTheme, alpha } from "@mui/material/styles"

export default function AboutStats({ t, isRTL }) {
    const theme = useTheme()

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
    ]

    return (
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
                                !isRTL &&
                                index !== stats.length - 1
                                    ? "1px solid"
                                    : "none",
                            borderLeft:
                                isRTL &&
                                index !== stats.length - 1
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
    )
}