import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useTheme } from "@mui/material/styles"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined"

export default function ComingSoon() {
    const { category } = useParams()
    const navigate = useNavigate()

    const { t, i18n } = useTranslation()
    const theme = useTheme()

    const isDark = theme.palette.mode === "dark"
    const isRTL = i18n.dir() === "rtl"

    const categoryName = t(
        `products.${category}`,
        {
            defaultValue: category,
        }
    )

    return (
        <Box
            component="main"
            dir={isRTL ? "rtl" : "ltr"}
            sx={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: {
                    xs: 5,
                    md: 8,
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 680,
                    textAlign: "center",
                    p: {
                        xs: 4,
                        sm: 6,
                        md: 7,
                    },
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 4,
                    backgroundColor:
                        "background.paper",
                    boxShadow: isDark
                        ? "0 16px 40px rgba(0,0,0,0.25)"
                        : "0 16px 40px rgba(0,0,0,0.07)",
                }}
            >
                <Box
                    sx={{
                        width: 70,
                        height: 70,
                        mx: "auto",
                        mb: 3,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                            "action.hover",
                        color: "primary.main",
                    }}
                >
                    <AutoAwesomeOutlinedIcon
                        sx={{
                            fontSize: 32,
                        }}
                    />
                </Box>

                <Typography
                    variant="overline"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        color: "primary.main",
                    }}
                >
                    {t(
                        "products.comingSoon"
                    )}
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        mt: 1,
                        mb: 2,
                        fontWeight: 700,
                        fontSize: {
                            xs: "2rem",
                            sm: "2.4rem",
                            md: "2.8rem",
                        },
                    }}
                >
                    {categoryName}
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        maxWidth: 520,
                        mx: "auto",
                        lineHeight: 1.8,
                    }}
                >
                    {t(
                        "products.comingSoonDescription"
                    )}
                </Typography>

                <Button
                    variant="contained"
                    startIcon={
                        <ArrowBackIcon
                            sx={{
                                transform: isRTL
                                    ? "rotate(180deg)"
                                    : "none",
                            }}
                        />
                    }
                    onClick={() =>
                        navigate("/products")
                    }
                    sx={{
                        mt: 4,
                        borderRadius: 2,
                        px: 3,
                        py: 1.2,
                    }}
                >
                    {t(
                        "products.backToProducts"
                    )}
                </Button>
            </Box>
        </Box>
    )
}