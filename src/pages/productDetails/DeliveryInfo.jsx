import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"

const LOW_STOCK_THRESHOLD = 10

export default function DeliveryInfo({ quantity }) {
    const { t } = useTranslation()
    const isInStock = quantity > 0
    const isLowStock = isInStock && quantity <= LOW_STOCK_THRESHOLD

    const items = [
        {
            icon: <Inventory2OutlinedIcon fontSize="small" color="action" />,
            text: isInStock
                ? isLowStock
                    ? t("productDetails.lowStock", { count: quantity })
                    : t("productDetails.inStock")
                : t("productDetails.outOfStock"),
        },
        { icon: <LocalShippingOutlinedIcon fontSize="small" color="action" />, text: t("productDetails.expressDelivery") },
        { icon: <VerifiedUserOutlinedIcon fontSize="small" color="action" />, text: t("productDetails.warranty") },
    ]

    return (
        <Box
            component="section"
            sx={{ mt: 6, p: 3, display: "flex", flexWrap: "wrap", gap: 4, border: "1px solid", borderColor: "divider", borderRadius: 2.5, backgroundColor: "background.paper" }}
        >
            {items.map((item, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {item.icon}
                    <Typography variant="body2" color="text.secondary">{item.text}</Typography>
                </Box>
            ))}
        </Box>
    )
}