import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const TABS = ["description", "specifications", "shipping"]

export default function ProductTabs({ activeTab, onTabChange, product }) {
    const { t } = useTranslation()

    return (
        <Box component="section" sx={{ mt: 6 }}>
            <Box sx={{ display: "flex", gap: 4, borderBottom: "1px solid", borderColor: "divider" }}>
                {TABS.map((tab) => (
                    <Box
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        sx={{
                            pb: 1.5,
                            cursor: "pointer",
                            color: activeTab === tab ? "primary.main" : "text.secondary",
                            borderBottom: "2px solid",
                            borderColor: activeTab === tab ? "primary.main" : "transparent",
                        }}
                    >
                        {t(`productDetails.tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`)}
                    </Box>
                ))}
            </Box>

            <Box sx={{ mt: 3, p: 4, maxWidth: 900, borderRadius: 3, border: "1px solid", borderColor: "divider", backgroundColor: "background.paper" }}>
                {activeTab === "description" && (
                    <Typography color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                        {product.description || t("productDetails.noDescription")}
                    </Typography>
                )}
                {activeTab === "specifications" && (
                    <Typography color="text.secondary">{t("productDetails.specificationsText")}</Typography>
                )}
                {activeTab === "shipping" && (
                    <Typography color="text.secondary">{t("productDetails.shippingText")}</Typography>
                )}
            </Box>
        </Box>
    )
}