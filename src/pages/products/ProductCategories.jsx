import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function ProductCategories({
    categories,
    onSelect,
    isDark,
}) {
    const { t } = useTranslation()

    return (
        <Box component="section">
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 700,
                    mb: 2,
                }}
            >
                {t("products.categories")}
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(4, 1fr)",
                    },
                    gap: {
                        xs: 1.5,
                        sm: 2,
                    },
                }}
            >
                {categories.map((category) => (
                    <Box
                        key={category.key}
                        onClick={() =>
                            onSelect(category)
                        }
                        sx={{
                            display: "flex",
                            alignItems:
                                "center",
                            gap: 1.5,
                            p: {
                                xs: 1.5,
                                sm: 2,
                            },
                            minHeight: {
                                xs: 78,
                                sm: 88,
                            },
                            border: "1px solid",
                            borderColor:
                                "divider",
                            borderRadius: 2.5,
                            backgroundColor:
                                "background.paper",
                            cursor: "pointer",
                            transition:
                                "all 0.2s ease",

                            "&:hover": {
                                transform:
                                    "translateY(-3px)",
                                borderColor:
                                    "primary.main",
                                boxShadow: isDark
                                    ? "0 10px 24px rgba(0,0,0,0.22)"
                                    : "0 10px 24px rgba(0,0,0,0.07)",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: {
                                    xs: 44,
                                    sm: 50,
                                },
                                height: {
                                    xs: 44,
                                    sm: 50,
                                },
                                flexShrink: 0,
                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                borderRadius: 2,
                                backgroundColor:
                                    "action.hover",
                                p: 1,
                            }}
                        >
                            <Box
                                component="img"
                                src={
                                    category.icon
                                }
                                alt={t(
                                    `products.${category.key}`
                                )}
                                sx={{
                                    width:
                                        "100%",
                                    height:
                                        "100%",
                                    objectFit:
                                        "contain",
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                minWidth: 0,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 650,
                                    fontSize: {
                                        xs:
                                            "0.88rem",
                                        sm:
                                            "0.98rem",
                                    },
                                }}
                            >
                                {t(
                                    `products.${category.key}`
                                )}
                            </Typography>

                            {!category.available && (
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {t(
                                        "products.comingSoon"
                                    )}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}