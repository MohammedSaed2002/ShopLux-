import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import { useTranslation } from 'react-i18next'
import useProduct from '../../hooks/useProduct'
import useAddToCart from '../../hooks/useAddToCart'
import useAddReview from '../../hooks/useAddReview'
import useAuthStore from '../../store/useAuthStore'

export default function ProductDetails() {
    const { id } = useParams();
    const { t } = useTranslation();
    const { data, isLoading } = useProduct(id);
    const { mutate: addToCart } = useAddToCart();
    const { mutate: addReview, isPending, isSuccess, error } = useAddReview(id);
    const token = useAuthStore((state) => state.token);

    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [commentError, setCommentError] = useState("");

    if (isLoading) return <CircularProgress />

    const handleSubmitReview = () => {
        if (!newComment.trim()) {
            setCommentError(t("reviews.commentRequired"));
            return;
        }
        setCommentError("");
        addReview(
            { rating: newRating || 5, comment: newComment },
            {
                onSuccess: () => {
                    setNewComment("");
                    setNewRating(0);
                }
            }
        );
    };

    const serverErrorMessage = error?.response?.data?.message || (error ? t("reviews.genericError") : null);

    return (
        <Box sx={{ padding: 4 }}>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <img
                    src={data.response.image}
                    alt="product"
                    width={300}
                    height={300}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                />
                <Box>
                    <Typography variant="h4">
                        {data.response.name || t("productDetails.noName")}
                    </Typography>
                    <Typography variant="h5" color="primary" sx={{ marginTop: 2 }}>
                        {t("productDetails.price")}: {data.response.price}$
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                        {t("productDetails.rate")}: {data.response.rate} ⭐
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                        {data.response.description || t("productDetails.noDescription")}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ marginTop: 2 }}
                        onClick={() => addToCart({ productId: data.response.id, count: 1 })}
                    >
                        {t("productDetails.addToCart")}
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ marginY: 4 }} />

            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                {t("reviews.title")}
            </Typography>

            {data.response.reviews?.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }}>
                    {data.response.reviews.map((review, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, padding: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                            <Avatar>{review.userName?.[0]?.toUpperCase()}</Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="subtitle2">{review.userName}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(review.createdAt).toLocaleDateString("en-GB")}
                                    </Typography>
                                </Box>
                                <Rating value={review.rating} readOnly size="small" />
                                <Typography variant="body2" sx={{ marginTop: 0.5 }}>
                                    {review.comment}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 4 }}>
                    {t("reviews.noReviews")}
                </Typography>
            )}

            <Divider sx={{ marginY: 4 }} />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {t("reviews.addReview")}
            </Typography>

            {!token ? (
                <Alert severity="info">{t("reviews.loginToReview")}</Alert>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
                    <Box>
                        <Typography component="legend" variant="body2">
                            {t("reviews.yourRating")}
                        </Typography>
                        <Rating
                            value={newRating}
                            onChange={(e, value) => setNewRating(value)}
                        />
                    </Box>
                    <TextField
                        multiline
                        rows={3}
                        label={t("reviews.yourComment")}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        error={!!commentError}
                        helperText={commentError}
                    />

                    {isSuccess && <Alert severity="success">{t("reviews.success")}</Alert>}
                    {serverErrorMessage && <Alert severity="error">{serverErrorMessage}</Alert>}

                    <Button
                        variant="contained"
                        onClick={handleSubmitReview}
                        disabled={isPending}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        {isPending ? t("reviews.submitting") : t("reviews.submit")}
                    </Button>
                </Box>
            )}
        </Box>
    )
}