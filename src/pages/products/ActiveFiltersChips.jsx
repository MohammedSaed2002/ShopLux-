import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"

export default function ActiveFiltersChips({
    search,
    minRating,
    priceRange,
    onRemoveSearch,
    onRemoveRating,
    onRemovePrice,
    onClearAll,
}) {
    const { t } = useTranslation()
    const chips = []

    if (search.trim()) {
        chips.push({ key: "search", label: `"${search}"`, onDelete: onRemoveSearch })
    }

    if (minRating > 0) {
        chips.push({
            key: "rating",
            label: `${minRating}★ ${t("products.andUp")}`,
            onDelete: onRemoveRating,
        })
    }

    if (priceRange[0] !== 0 || priceRange[1] !== 5000) {
        chips.push({
            key: "price",
            label: `$${priceRange[0]} - $${priceRange[1]}`,
            onDelete: onRemovePrice,
        })
    }

    if (chips.length === 0) return null

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", mb: 3 }}>
            {chips.map((chip) => (
                <Chip key={chip.key} label={chip.label} onDelete={chip.onDelete} size="small" variant="outlined" />
            ))}

            <Button size="small" onClick={onClearAll} sx={{ ml: 0.5 }}>
                {t("products.clearAll")}
            </Button>
        </Box>
    )
}