import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import StarIcon from "@mui/icons-material/Star"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"

export default function ProductCard({ product, view = "grid", favorite, onFavorite, onAddToCart, onOpen, isDark }) {
    const { t } = useTranslation()
    const isList = view === "list"

    return (
        <Box
            onClick={() => onOpen(product.id)}
            sx={{
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2.5,
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: isList ? { xs: "column", sm: "row" } : "column",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: isDark ? "0 10px 25px rgba(0,0,0,0.25)" : "0 10px 25px rgba(0,0,0,0.08)",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    height: isList ? { xs: 200, sm: 180 } : { xs: 230, sm: 220, md: 230 },
                    width: isList ? { xs: "100%", sm: 220 } : "100%",
                    flexShrink: 0,
                    backgroundColor: "background.default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2.5,
                }}
            >
                <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />

                <Box
                    onClick={(event) => {
                        event.stopPropagation()
                        onFavorite(product.id)
                    }}
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    {favorite ? (
                        <FavoriteIcon fontSize="small" sx={{ color: "error.main" }} />
                    ) : (
                        <FavoriteBorderIcon fontSize="small" />
                    )}
                </Box>
            </Box>

            <Box sx={{ p: 2.25, flex: 1, display: "flex", flexDirection: "column", justifyContent: isList ? "center" : "flex-start" }}>
                <Typography
                    sx={{
                        fontWeight: 650,
                        lineHeight: 1.45,
                        minHeight: isList ? "auto" : 44,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {product.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
                    <StarIcon fontSize="small" sx={{ color: "warning.main" }} />
                    <Typography variant="body2" fontWeight={600}>{product.rate}</Typography>
                </Box>

                <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.08rem", color: "primary.main" }}>
                        ${product.price}
                    </Typography>

                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<ShoppingCartOutlinedIcon fontSize="small" />}
                        onClick={(event) => onAddToCart(event, product.id)}
                        sx={{ borderRadius: 1.5, px: 1.5, whiteSpace: "nowrap" }}
                    >
                        {t("products.addToCart")}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}