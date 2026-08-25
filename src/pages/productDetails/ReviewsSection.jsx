import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import ReviewsList from "./ReviewsList"
import ReviewForm from "./ReviewForm"

export default function ReviewsSection({ reviews, formProps }) {
    const { t } = useTranslation()

    return (
        <Box component="section" sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>{t("reviews.title")}</Typography>

            <Box sx={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <ReviewsList reviews={reviews} />
                <ReviewForm {...formProps} />
            </Box>
        </Box>
    )
}