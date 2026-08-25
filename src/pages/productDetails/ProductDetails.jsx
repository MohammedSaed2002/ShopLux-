import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

import useProduct from "../../hooks/useProduct"
import useAddToCart from "../../hooks/useAddToCart"
import useAddReview from "../../hooks/useAddReview"
import useAuthStore from "../../store/useAuthStore"

import ProductGallery from "./ProductGallery"
import ProductInfo from "./ProductInfo"
import RatingBreakdown from "./RatingBreakdown"
import ProductTabs from "./ProductTabs"
import DeliveryInfo from "./DeliveryInfo"
import ReviewsSection from "./ReviewsSection"
import RelatedProducts from "./RelatedProducts"

export default function ProductDetails() {
    const { id } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()

    const { data, isLoading, isError } = useProduct(id)
    const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()
    const { mutate: addReview, isPending, isSuccess, error } = useAddReview(id)
    const token = useAuthStore((state) => state.token)

    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState("description")
    const [newRating, setNewRating] = useState(0)
    const [newComment, setNewComment] = useState("")
    const [commentError, setCommentError] = useState("")
    const [ratingError, setRatingError] = useState("")
    const [mainImage, setMainImage] = useState(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

    if (isLoading) return <CircularProgress sx={{ m: 4 }} />

    if (isError || !data?.response) {
        return (
            <Box sx={{ p: 4, textAlign: "center", mt: 6 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>{t("productDetails.loadErrorTitle")}</Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>{t("productDetails.loadErrorSubtitle")}</Typography>
                <Button variant="contained" onClick={() => navigate("/products")}>{t("productDetails.backToProducts")}</Button>
            </Box>
        )
    }

    const product = data.response
    const reviews = product.reviews || []

    const galleryImages = product.subImages?.length > 0 ? [product.image, ...product.subImages] : [product.image]
    const currentMainImage = mainImage || product.image

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : product.rate

    const handleAddToCart = () => {
        addToCart(
            { productId: product.id, count: quantity },
            {
                onSuccess: () => setSnackbar({ open: true, message: t("productDetails.addedToCart"), severity: "success" }),
                onError: () => setSnackbar({ open: true, message: t("productDetails.addToCartError"), severity: "error" }),
            }
        )
    }

    const handleSubmitReview = () => {
        let hasError = false

        if (!newRating) {
            setRatingError(t("reviews.ratingRequired"))
            hasError = true
        } else {
            setRatingError("")
        }

        if (!newComment.trim()) {
            setCommentError(t("reviews.commentRequired"))
            hasError = true
        } else {
            setCommentError("")
        }

        if (hasError) return

        addReview({ rating: newRating, comment: newComment }, { onSuccess: () => { setNewComment(""); setNewRating(0) } })
    }

    const serverErrorMessage = error?.response?.data?.message || (error ? t("reviews.genericError") : null)

    return (
        <Box sx={{ p: { xs: 3, md: 6 } }}>
            <Box sx={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <ProductGallery images={galleryImages} mainImage={currentMainImage} onSelect={setMainImage} />

                <ProductInfo
                    product={product}
                    averageRating={averageRating}
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    onAddToCart={handleAddToCart}
                    isAddingToCart={isAddingToCart}
                />
            </Box>

            <RatingBreakdown reviews={reviews} averageRating={averageRating} />

            <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} product={product} />

            <DeliveryInfo quantity={product.quantity} />

            <ReviewsSection
                reviews={reviews}
                formProps={{
                    isLoggedIn: !!token,
                    rating: newRating,
                    onRatingChange: (value) => { setNewRating(value); if (value) setRatingError("") },
                    ratingError,
                    comment: newComment,
                    onCommentChange: setNewComment,
                    commentError,
                    onSubmit: handleSubmitReview,
                    isSubmitting: isPending,
                    isSuccess,
                    serverError: serverErrorMessage,
                }}
            />

            <RelatedProducts currentProductId={product.id} />

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={() => setSnackbar((s) => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}