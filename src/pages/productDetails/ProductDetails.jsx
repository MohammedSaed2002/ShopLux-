import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
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

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [mainImage, setMainImage] = useState(null);

    if (isLoading) return <CircularProgress sx={{ margin: 4 }} />

    const product = data.response;

    // if there are extra images (subImages), show them, otherwise just show the main image again
    const galleryImages = product.subImages && product.subImages.length > 0
        ? [product.image, ...product.subImages]
        : [product.image];

    const currentMainImage = mainImage || product.image;

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

    const averageRating = product.reviews && product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : product.rate;

    return (
        <Box sx={{ padding: { xs: 3, md: 6 } }}>
            {/* Hero: gallery + info */}
            <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {/* left - gallery */}
                <Box sx={{ flex: '1 1 400px', maxWidth: 560 }}>
                    <Box
                        sx={{
                            aspectRatio: '1 / 1',
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box component="img" src={currentMainImage} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    {galleryImages.length > 1 && (
                        <Box sx={{ display: 'flex', gap: 1.5, marginTop: 1.5 }}>
                            {galleryImages.map((img, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={img}
                                    onClick={() => setMainImage(img)}
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        objectFit: 'cover',
                                        borderRadius: 1.5,
                                        cursor: 'pointer',
                                        border: currentMainImage === img ? '2px solid' : '2px solid transparent',
                                        borderColor: currentMainImage === img ? 'primary.main' : 'transparent',
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>

                {/* right - info */}
                <Box sx={{ flex: '1 1 320px' }}>
                    <Typography variant="h3" sx={{ marginBottom: 1 }}>
                        {product.name || t("productDetails.noName")}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                        <Rating value={averageRating} precision={0.1} readOnly />
                        <Typography color="text.secondary">
                            ({product.reviews?.length || 0} {t("productDetails.reviewsCount")})
                        </Typography>
                    </Box>

                    <Typography variant="h4" sx={{ color: '#ffb68b', fontWeight: 'bold', marginBottom: 3 }}>
                        {product.price}$
                    </Typography>

                    <Divider sx={{ marginY: 3 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 8 }}>
                            <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ minWidth: 24, textAlign: 'center' }}>{quantity}</Typography>
                            <IconButton onClick={() => setQuantity(q => q + 1)}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Button
                            variant="contained"
                            sx={{
                                flex: 1,
                                background: 'linear-gradient(135deg, #6c2bd9 0%, #3e008e 100%)',
                                padding: 1.5,
                                borderRadius: 8,
                            }}
                            onClick={() => addToCart({ productId: product.id, count: quantity })}
                        >
                            {t("productDetails.addToCart")}
                        </Button>
                    </Box>

                    <Divider sx={{ marginY: 3 }} />

                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocalShippingOutlinedIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                {t("productDetails.expressDelivery")}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <VerifiedUserOutlinedIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                {t("productDetails.warranty")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Tabs */}
            <Box sx={{ marginTop: 6 }}>
                <Box sx={{ display: 'flex', gap: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
                    {["description", "specifications", "shipping"].map((tab) => (
                        <Box
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            sx={{
                                paddingBottom: 1.5,
                                cursor: 'pointer',
                                color: activeTab === tab ? 'primary.main' : 'text.secondary',
                                borderBottom: activeTab === tab ? '2px solid' : '2px solid transparent',
                                borderColor: activeTab === tab ? 'primary.main' : 'transparent',
                            }}
                        >
                            {t(`productDetails.tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`)}
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        marginTop: 3,
                        padding: 4,
                        maxWidth: 900,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}
                >
                    {activeTab === "description" && (
                        <Typography color="text.secondary">
                            {product.description || t("productDetails.noDescription")}
                        </Typography>
                    )}
                    {activeTab === "specifications" && (
                        <Typography color="text.secondary">
                            {t("productDetails.specificationsText")}
                        </Typography>
                    )}
                    {activeTab === "shipping" && (
                        <Typography color="text.secondary">
                            {t("productDetails.shippingText")}
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* Reviews */}
            <Box sx={{ marginTop: 6 }}>
                <Typography variant="h5" sx={{ marginBottom: 3 }}>
                    {t("reviews.title")}
                </Typography>

                <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {/* reviews list */}
                    <Box sx={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {product.reviews?.length > 0 ? (
                            product.reviews.map((review, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        padding: 3,
                                        borderRadius: 3,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        backgroundColor: 'background.paper',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                                    <Typography sx={{ marginTop: 1.5 }}>{review.comment}</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography color="text.secondary">{t("reviews.noReviews")}</Typography>
                        )}
                    </Box>

                    {/* review form */}
                    <Box
                        sx={{
                            flex: '1 1 280px',
                            padding: 4,
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            height: 'fit-content',
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            {t("reviews.addReview")}
                        </Typography>

                        {!token ? (
                            <Alert severity="info">{t("reviews.loginToReview")}</Alert>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Rating value={newRating} onChange={(e, value) => setNewRating(value)} />
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
                                    sx={{ backgroundColor: '#914200', color: '#ffc3a1' }}
                                    onClick={handleSubmitReview}
                                    disabled={isPending}
                                >
                                    {isPending ? t("reviews.submitting") : t("reviews.submit")}
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}