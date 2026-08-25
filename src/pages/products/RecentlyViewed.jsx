import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function RecentlyViewed({ products, onOpen }) {
    const { t } = useTranslation()

    if (products.length === 0) return null

    return (
        <Box component="section" sx={{ mt: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                {t("products.recentlyViewed")}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
                {products.map((product) => (
                    <Box
                        key={product.id}
                        onClick={() => onOpen(product.id)}
                        sx={{
                            flex: "0 0 auto",
                            width: 160,
                            cursor: "pointer",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2.5,
                            overflow: "hidden",
                            backgroundColor: "background.paper",
                            transition: "transform 0.2s ease",
                            "&:hover": { transform: "translateY(-3px)" },
                        }}
                    >
                        <Box
                            sx={{
                                height: 120,
                                backgroundColor: "background.default",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 1.5,
                            }}
                        >
                            <Box
                                component="img"
                                src={product.image}
                                alt={product.name}
                                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                            />
                        </Box>

                        <Box sx={{ p: 1.25 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {product.name}
                            </Typography>

                            <Typography variant="body2" color="primary.main" sx={{ fontWeight: 700, mt: 0.25 }}>
                                ${product.price}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}