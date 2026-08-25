import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import LinearProgress from "@mui/material/LinearProgress"

export default function RatingBreakdown({ reviews, averageRating }) {
    const { t } = useTranslation()
    const total = reviews.length

    if (total === 0) return null

    const counts = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((review) => Math.round(review.rating) === star).length,
    }))

    return (
        <Box component="section" sx={{ mt: 6, maxWidth: 600 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                {t("productDetails.ratingBreakdownTitle")}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {averageRating.toFixed(1)}
                </Typography>
                <Typography color="text.secondary">
                    {t("productDetails.basedOnReviews", { count: total })}
                </Typography>
            </Box>

            {counts.map(({ star, count }) => (
                <Box key={star} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.75 }}>
                    <Typography variant="body2" sx={{ minWidth: 40 }}>{star} ★</Typography>
                    <LinearProgress
                        variant="determinate"
                        value={total > 0 ? (count / total) * 100 : 0}
                        sx={{ flex: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 24, textAlign: "right" }}>
                        {count}
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}