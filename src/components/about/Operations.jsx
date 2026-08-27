import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"

import { useTheme, alpha } from "@mui/material/styles"

import aboutTeamImage from "../../assets/about-team.jpg"

export default function Operations({ t }) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                px: { xs: 3, sm: 5, md: 8, lg: 12 },
                py: { xs: 8, md: 11 },
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
                        xs: "1fr",
                        md: "1fr 1fr",
                    },
                    gap: { xs: 6, md: 10 },
                    alignItems: "center",
                }}
            >
                <Box>
                    <Box
                        sx={{
                            position: "relative",
                            height: { xs: 320, sm: 400, md: 470 },
                            borderRadius: 5,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: `0 25px 60px ${alpha(theme.palette.common.black, 0.1)}`,
                        }}
                    >
                        <Box
                            component="img"
                            src={aboutTeamImage}
                            alt={t("about.images.teamAlt")}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        textAlign: {
                            xs: "center",
                            md: "start",
                        },
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
                        {t("about.operations.eyebrow")}
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            mb: 3,
                            lineHeight: 1.15,
                            fontSize: { xs: "2rem", md: "2.7rem" },
                        }}
                    >
                        {t("about.operations.title")}
                    </Typography>

                    <Typography color="text.secondary" sx={{ lineHeight: 1.9, mb: 3 }}>
                        {t("about.operations.text")}
                    </Typography>

                    <Box sx={{ display: "grid", gap: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1.5,
                                alignItems: "flex-start",
                                justifyContent: { xs: "center", md: "flex-start" },
                            }}
                        >
                            <TrendingUpOutlinedIcon sx={{ color: "primary.main", mt: 0.3 }} />

                            <Box>
                                <Typography sx={{ fontWeight: 800, mb: 0.5 }}>
                                    {t("about.operations.point1Title")}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {t("about.operations.point1Text")}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1.5,
                                alignItems: "flex-start",
                                justifyContent: { xs: "center", md: "flex-start" },
                            }}
                        >
                            <VerifiedOutlinedIcon sx={{ color: "success.main", mt: 0.3 }} />

                            <Box>
                                <Typography sx={{ fontWeight: 800, mb: 0.5 }}>
                                    {t("about.operations.point2Title")}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {t("about.operations.point2Text")}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}