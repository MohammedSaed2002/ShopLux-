import React, { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import Divider from "@mui/material/Divider"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import useCart from "../../hooks/useCart"
import useCheckout from "../../hooks/useCheckout"
import useProducts from "../../hooks/useProducts"

export default function Checkout() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, isLoading } = useCart();
    const { data: productsData } = useProducts();
    const { mutate: checkout, isPending, isSuccess, isError } = useCheckout();
    const [paymentMethod, setPaymentMethod] = useState("Cash");

    const cardSchema = yup.object({
        cardNumber: yup.string().required().matches(/^\d{16}$/, "16 digits"),
        cardHolder: yup.string().required(),
        expiryDate: yup.string().required().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
        cvv: yup.string().required().matches(/^\d{3,4}$/, "3-4 digits"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(cardSchema),
    });

    if (isLoading) return <CircularProgress sx={{ margin: 4 }} />

    const runCheckout = () => {
        checkout(paymentMethod, {
            onSuccess: () => {
                setTimeout(() => navigate("/"), 2000);
            }
        });
    };

    const subtotal = data?.cartTotal ?? 0;
    const tax = Math.round(subtotal * 0.05 * 100) / 100;
    const total = subtotal + tax;

    return (
        <Box sx={{ padding: { xs: 3, md: 6 } }}>
            <Typography variant="h4">{t("checkout.title")}</Typography>
            <Typography color="text.secondary" sx={{ marginBottom: 4 }}>
                {t("checkout.subtitle")}
            </Typography>

            <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {/* left side - forms */}
                <Box sx={{ flex: "2 1 500px", display: "flex", flexDirection: "column", gap: 3 }}>

                    {/* shipping address (visual only, not sent to server) */}
                    <Box
                        sx={{
                            padding: 4,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 3 }}>
                            <LocalShippingOutlinedIcon color="primary" fontSize="small" />
                            <Typography variant="h6">{t("checkout.shippingAddress")}</Typography>
                        </Box>

                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5 }}>
                            <TextField label={t("checkout.fullName")} variant="outlined" />
                            <TextField label={t("checkout.phoneNumber")} variant="outlined" />
                            <TextField label={t("checkout.streetAddress")} variant="outlined" sx={{ gridColumn: "1 / span 2" }} />
                            <TextField label={t("checkout.city")} variant="outlined" />
                            <TextField label={t("checkout.country")} variant="outlined" />
                        </Box>
                    </Box>

                    {/* payment method */}
                    <Box
                        sx={{
                            padding: 4,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 3 }}>
                            <CreditCardIcon color="primary" fontSize="small" />
                            <Typography variant="h6">{t("checkout.paymentMethodTitle")}</Typography>
                        </Box>

                        {/* tabs */}
                        <Box sx={{ display: "flex", borderBottom: "1px solid", borderColor: "divider", marginBottom: 3 }}>
                            <Box
                                onClick={() => setPaymentMethod("Visa")}
                                sx={{
                                    flex: 1,
                                    textAlign: "center",
                                    paddingBottom: 2,
                                    cursor: "pointer",
                                    color: paymentMethod === "Visa" ? "primary.main" : "text.secondary",
                                    borderBottom: paymentMethod === "Visa" ? "2px solid" : "2px solid transparent",
                                    borderColor: paymentMethod === "Visa" ? "primary.main" : "transparent",
                                    backgroundColor: paymentMethod === "Visa" ? "action.hover" : "transparent",
                                }}
                            >
                                {t("checkout.creditCard")}
                            </Box>
                            <Box
                                onClick={() => setPaymentMethod("Cash")}
                                sx={{
                                    flex: 1,
                                    textAlign: "center",
                                    paddingBottom: 2,
                                    cursor: "pointer",
                                    color: paymentMethod === "Cash" ? "primary.main" : "text.secondary",
                                    borderBottom: paymentMethod === "Cash" ? "2px solid" : "2px solid transparent",
                                    borderColor: paymentMethod === "Cash" ? "primary.main" : "transparent",
                                }}
                            >
                                {t("checkout.cashOnDelivery")}
                            </Box>
                        </Box>

                        {paymentMethod === "Visa" && (
                            <Box component="form" onSubmit={handleSubmit(runCheckout)} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                                {/* card visual */}
                                <Box
                                    sx={{
                                        height: 160,
                                        borderRadius: 3,
                                        background: "linear-gradient(135deg, #6c2bd9 0%, #3e008e 100%)",
                                        padding: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        color: "#fff",
                                    }}
                                >
                                    <Typography variant="caption" sx={{ opacity: 0.6, letterSpacing: 2 }}>CARD HOLDER</Typography>
                                    <Typography>SHOPLUX MEMBER</Typography>
                                </Box>

                                <TextField
                                    label={t("checkout.cardNumber")}
                                    placeholder="0000 0000 0000 0000"
                                    {...register("cardNumber")}
                                    error={!!errors.cardNumber}
                                    helperText={errors.cardNumber?.message}
                                />
                                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5 }}>
                                    <TextField
                                        label={t("checkout.expiryDate")}
                                        placeholder="MM/YY"
                                        {...register("expiryDate")}
                                        error={!!errors.expiryDate}
                                        helperText={errors.expiryDate?.message}
                                    />
                                    <TextField
                                        label={t("checkout.cvv")}
                                        placeholder="123"
                                        {...register("cvv")}
                                        error={!!errors.cvv}
                                        helperText={errors.cvv?.message}
                                    />
                                </Box>
                                <TextField
                                    label={t("checkout.cardHolder")}
                                    {...register("cardHolder")}
                                    error={!!errors.cardHolder}
                                    helperText={errors.cardHolder?.message}
                                />

                                {/* hidden submit trigger from the summary button on the right */}
                                <button id="visa-submit-trigger" type="submit" style={{ display: "none" }} />
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* right side - order summary */}
                <Box sx={{ flex: "1 1 320px" }}>
                    <Box
                        sx={{
                            padding: 4,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: 3 }}>{t("checkout.orderSummary")}</Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 3 }}>
                            {data?.items?.map((item) => {
                                const matchedProduct = productsData?.response?.data?.find(p => p.id === item.productId);
                                return (
                                    <Box key={item.productId} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        {matchedProduct ? (
                                            <Box component="img" src={matchedProduct.image} sx={{ width: 56, height: 56, borderRadius: 2, objectFit: "cover" }} />
                                        ) : (
                                            <Box sx={{ width: 56, height: 56, borderRadius: 2, backgroundColor: "background.default" }} />
                                        )}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2">{item.productName}</Typography>
                                            <Typography variant="caption" color="text.secondary">x{item.count}</Typography>
                                        </Box>
                                        <Typography color="primary">{item.totalPrice}$</Typography>
                                    </Box>
                                );
                            })}
                        </Box>

                        <Divider sx={{ marginBottom: 2 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                            <Typography color="text.secondary">{t("checkout.subtotal")}</Typography>
                            <Typography>{subtotal}$</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                            <Typography color="text.secondary">{t("checkout.shipping")}</Typography>
                            <Typography sx={{ color: "primary.main" }}>{t("checkout.free")}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                            <Typography color="text.secondary">{t("checkout.estimatedTax")}</Typography>
                            <Typography>{tax}$</Typography>
                        </Box>

                        <Divider sx={{ marginBottom: 2 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <Typography variant="h6">{t("checkout.total")}</Typography>
                            <Typography variant="h6" sx={{ color: "#ffd700" }}>{total}$</Typography>
                        </Box>

                        {isSuccess && <Alert severity="success" sx={{ marginBottom: 2 }}>{t("checkout.success")}</Alert>}
                        {isError && <Alert severity="error" sx={{ marginBottom: 2 }}>{t("checkout.error")}</Alert>}

                        <Button
                            fullWidth
                            variant="contained"
                            disabled={isPending || !data?.items?.length}
                            sx={{
                                background: "linear-gradient(135deg, #6c2bd9 0%, #d2bcff 100%)",
                                padding: 1.8,
                                borderRadius: 3,
                                marginBottom: 2,
                            }}
                            onClick={() => {
                                if (paymentMethod === "Visa") {
                                    document.getElementById("visa-submit-trigger").click();
                                } else {
                                    runCheckout();
                                }
                            }}
                        >
                            {isPending ? t("checkout.processing") : t("checkout.placeOrder")}
                        </Button>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, opacity: 0.6 }}>
                            <LockOutlinedIcon fontSize="small" />
                            <Typography variant="caption">{t("checkout.secureTransaction")}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}