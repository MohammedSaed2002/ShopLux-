import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"

import { useTheme, alpha } from "@mui/material/styles"

import aboutStoryImage from "../../assets/about-story.jpg"

export default function OurStory({ t }) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                px: { xs: 3, sm: 5, md: 8, lg: 12 },
                py: { xs: 8, md: 12 },
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
                            borderRadius: 5,
                            overflow: "hidden",
                            height: {
                                xs: 350,
                                sm: 450,
                                md: 520,
                            },
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: `0 25px 60px ${alpha(theme.palette.common.black, 0.12)}`,
                        }}
                    >
                        <Box
                            component="img"
                            src={aboutStoryImage}
                            alt={t("about.images.storyAlt")}
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
                        {t("about.story.eyebrow")}
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            lineHeight: 1.15,
                            mb: 3,
                            fontSize: {
                                xs: "2rem",
                                md: "2.8rem",
                            },
                        }}
                    >
                        {t("about.story.title")}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            lineHeight: 1.95,
                            mb: 3,
                        }}
                    >
                        {t("about.story.text1")}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            lineHeight: 1.95,
                            mb: 4,
                        }}
                    >
                        {t("about.story.text2")}
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gap: 2,
                        }}
                    >
                        {[
                            t("about.story.point1"),
                            t("about.story.point2"),
                            t("about.story.point3"),
                        ].map((point) => (
                            <Box
                                key={point}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                    justifyContent: {
                                        xs: "center",
                                        md: "flex-start",
                                    },
                                }}
                            >
                                <CheckCircleOutlinedIcon
                                    sx={{
                                        color: "success.main",
                                        fontSize: 22,
                                        flexShrink: 0,
                                    }}
                                />

                                <Typography sx={{ fontWeight: 600 }}>
                                    {point}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}