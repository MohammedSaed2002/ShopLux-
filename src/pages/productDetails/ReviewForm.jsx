import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"

export default function ReviewForm({
    isLoggedIn, rating, onRatingChange, ratingError,
    comment, onCommentChange, commentError,
    onSubmit, isSubmitting, isSuccess, serverError,
}) {
    const { t } = useTranslation()

    return (
        <Box sx={{ flex: "1 1 280px", p: 4, borderRadius: 3, border: "1px solid", borderColor: "divider", backgroundColor: "background.paper", height: "fit-content" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{t("reviews.addReview")}</Typography>

            {!isLoggedIn ? (
                <Alert severity="info">{t("reviews.loginToReview")}</Alert>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                        <Rating value={rating} onChange={(_, value) => onRatingChange(value)} />
                        {ratingError && (
                            <Typography variant="caption" color="error" sx={{ display: "block" }}>{ratingError}</Typography>
                        )}
                    </Box>

                    <TextField
                        multiline
                        rows={3}
                        label={t("reviews.yourComment")}
                        value={comment}
                        onChange={(event) => onCommentChange(event.target.value)}
                        error={!!commentError}
                        helperText={commentError}
                    />

                    {isSuccess && <Alert severity="success">{t("reviews.success")}</Alert>}
                    {serverError && <Alert severity="error">{serverError}</Alert>}

                    <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
                        {isSubmitting ? t("reviews.submitting") : t("reviews.submit")}
                    </Button>
                </Box>
            )}
        </Box>
    )
}