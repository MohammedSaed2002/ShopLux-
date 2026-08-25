import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import useProducts from "../../hooks/useProducts"

export default function RelatedProducts({ currentProductId }) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const { data } = useProducts({ limit: 100 })
    const allProducts = data?.response?.data || []
    const related = allProducts.filter((product) => product.id !== currentProductId).slice(0, 4)

    if (related.length === 0) return null

    return (
        <Box component="section" sx={{ mt: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{t("productDetails.relatedTitle")}</Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 2.5 }}>
                {related.map((product) => (
                    <Box
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                        sx={{
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
                        <Box sx={{ height: 180, backgroundColor: "background.default", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
                            <Box component="img" src={product.image} alt={product.name} sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </Box>

                        <Box sx={{ p: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="primary.main" sx={{ fontWeight: 700, mt: 0.5 }}>
                                ${product.price}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}