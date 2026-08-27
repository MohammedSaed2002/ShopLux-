import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

import { useTheme, alpha } from "@mui/material/styles"

export default function AboutCTA({ t, navigate, isRTL }) {
    const theme = useTheme()

    const isDark = theme.palette.mode === "dark"

    return (
        <Box
            sx={{
                px: { xs: 3, sm: 5, md: 8, lg: 12 },
                py: { xs: 8, md: 10 },
            }}
        >
            <Box
                sx={{
                    maxWidth: 1150,
                    mx: "auto",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: { xs: 4, md: 6 },
                    px: { xs: 3, sm: 5, md: 8 },
                    py: { xs: 6, md: 8 },
                    textAlign: "center",
                    background: isDark
                        ? `linear-gradient(
                            135deg,
                            ${alpha(theme.palette.primary.dark, 0.65)},
                            ${alpha(theme.palette.secondary.dark, 0.45)}
                        )`
                        : `linear-gradient(
                            135deg,
                            ${alpha(theme.palette.primary.main, 0.12)},
                            ${alpha(theme.palette.secondary.main, 0.1)}
                        )`,
                    border: "1px solid",
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: 250,
                        height: 250,
                        borderRadius: "50%",
                        top: -150,
                        insetInlineStart: -100,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        filter: "blur(10px)",
                    }}
                />

                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            mb: 2,
                            fontSize: { xs: "2rem", md: "2.8rem" },
                        }}
                    >
                        {t("about.cta.title")}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            maxWidth: 650,
                            mx: "auto",
                            lineHeight: 1.8,
                            mb: 4,
                        }}
                    >
                        {t("about.cta.text")}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/products")}
                        endIcon={
                            isRTL ? (
                                <ArrowForwardIcon sx={{ transform: "rotate(180deg)" }} />
                            ) : (
                                <ArrowForwardIcon />
                            )
                        }
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 800,
                        }}
                    >
                        {t("about.cta.button")}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}