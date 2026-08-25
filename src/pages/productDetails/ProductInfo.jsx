import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"

import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

export default function ProductInfo({ product, averageRating, quantity, onQuantityChange, onAddToCart, isAddingToCart }) {
    const { t } = useTranslation()

    return (
        <Box sx={{ flex: "1 1 320px" }}>
            <Typography variant="h3" sx={{ mb: 1 }}>
                {product.name || t("productDetails.noName")}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Rating value={averageRating} precision={0.1} readOnly />
                <Typography color="text.secondary">
                    ({product.reviews?.length || 0} {t("productDetails.reviewsCount")})
                </Typography>
            </Box>

            <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold", mb: 3 }}>
                {product.price}$
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", border: "1px solid", borderColor: "divider", borderRadius: 8 }}>
                    <IconButton onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ minWidth: 24, textAlign: "center" }}>{quantity}</Typography>
                    <IconButton onClick={() => onQuantityChange(quantity + 1)}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Button variant="contained" disabled={isAddingToCart} sx={{ flex: 1, borderRadius: 8, py: 1.5 }} onClick={onAddToCart}>
                    {isAddingToCart ? t("checkout.processing") : t("productDetails.addToCart")}
                </Button>
            </Box>
        </Box>
    )
}