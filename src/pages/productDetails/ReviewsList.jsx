import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import Avatar from "@mui/material/Avatar"

export default function ReviewsList({ reviews }) {
    const { t } = useTranslation()

    if (!reviews || reviews.length === 0) {
        return <Typography color="text.secondary">{t("reviews.noReviews")}</Typography>
    }

    return (
        <Box sx={{ flex: "2 1 400px", display: "flex", flexDirection: "column", gap: 2 }}>
            {reviews.map((review, index) => (
                <Box key={index} sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider", backgroundColor: "background.paper" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar>{review.userName?.[0]?.toUpperCase()}</Avatar>
                            <Box>
                                <Typography variant="subtitle2">{review.userName}</Typography>
                                <Rating value={review.rating} readOnly size="small" />
                            </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(review.createdAt).toLocaleDateString("en-GB")}
                        </Typography>
                    </Box>
                    <Typography sx={{ mt: 1.5 }}>{review.comment}</Typography>
                </Box>
            ))}
        </Box>
    )
}