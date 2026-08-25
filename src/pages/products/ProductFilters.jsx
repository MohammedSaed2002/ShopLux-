import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Slider from "@mui/material/Slider"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"

import TuneIcon from "@mui/icons-material/Tune"
import StarIcon from "@mui/icons-material/Star"

export default function ProductFilters({
    minRating,
    priceRange,
    onRatingChange,
    onPriceChange,
    onClear,
    fullWidth = false,
}) {
    const { t } = useTranslation()

    return (
        <Box
            component="aside"
            sx={{
                width: fullWidth ? "100%" : 245,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2.5,
                p: 2.5,
                backgroundColor:
                    "background.paper",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                }}
            >
                <TuneIcon
                    fontSize="small"
                    color="action"
                />

                <Typography
                    variant="h6"
                    sx={{ fontWeight: 650 }}
                >
                    {t("products.filters")}
                </Typography>
            </Box>

            <Divider sx={{ mb: 2.5 }} />

            <Typography
                variant="subtitle2"
                sx={{
                    mb: 1,
                    fontWeight: 650,
                }}
            >
                {t("products.ratingTitle")}
            </Typography>

            {[4, 3].map((rating) => (
                <FormControlLabel
                    key={rating}
                    control={
                        <Checkbox
                            size="small"
                            checked={
                                minRating === rating
                            }
                            onChange={() =>
                                onRatingChange(
                                    minRating === rating
                                        ? 0
                                        : rating
                                )
                            }
                        />
                    }
                    label={
                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 0.4,
                            }}
                        >
                            <Typography variant="body2">
                                {rating}
                            </Typography>

                            <StarIcon
                                fontSize="small"
                                sx={{
                                    color: "warning.main",
                                }}
                            />

                            <Typography variant="body2">
                                {t(
                                    "products.andUp"
                                )}
                            </Typography>
                        </Box>
                    }
                />
            ))}

            <FormControlLabel
                control={
                    <Checkbox
                        size="small"
                        checked={minRating === 0}
                        onChange={() =>
                            onRatingChange(0)
                        }
                    />
                }
                label={t(
                    "products.allRatings"
                )}
            />

            <Divider sx={{ my: 3 }} />

            <Typography
                variant="subtitle2"
                sx={{
                    mb: 2,
                    fontWeight: 650,
                }}
            >
                {t("products.priceTitle")}
            </Typography>

            <Slider
                value={priceRange}
                onChange={(_, value) =>
                    onPriceChange(value)
                }
                min={0}
                max={5000}
                step={50}
                valueLabelDisplay="auto"
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    mt: 0.5,
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    ${priceRange[0]}
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    ${priceRange[1]}
                </Typography>
            </Box>

            <Button
                size="small"
                onClick={onClear}
                sx={{
                    mt: 2,
                    px: 0,
                }}
            >
                {t(
                    "products.clearFilters"
                )}
            </Button>
        </Box>
    )
}