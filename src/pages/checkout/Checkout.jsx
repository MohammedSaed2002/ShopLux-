import React, { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import useCart from "../../hooks/useCart"
import useCheckout from "../../hooks/useCheckout"

export default function Checkout() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, isLoading } = useCart();
    const { mutate: checkout, isPending, isSuccess, isError } = useCheckout();
    const [paymentMethod, setPaymentMethod] = useState("Cash");

    const cardSchema = yup.object({
        cardNumber: yup
            .string()
            .required()
            .matches(/^\d{16}$/, t("checkout.cardNumber") + " (16 digits)"),
        cardHolder: yup.string().required(),
        expiryDate: yup
            .string()
            .required()
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
        cvv: yup
            .string()
            .required()
            .matches(/^\d{3,4}$/, t("checkout.cvv") + " (3-4 digits)"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(cardSchema),
    });

    if (isLoading) return <CircularProgress />

    const runCheckout = () => {
        checkout(paymentMethod, {
            onSuccess: () => {
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        });
    };

    const handleCashConfirm = () => {
        runCheckout();
    };

    const handleVisaConfirm = () => {
        runCheckout();
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 500 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                {t("checkout.title")}
            </Typography>

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {t("checkout.cartTotal")}: ${data?.cartTotal ?? 0}
            </Typography>

            <FormControl sx={{ marginBottom: 3 }}>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                    {t("checkout.choosePayment")}
                </Typography>
                <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <FormControlLabel value="Cash" control={<Radio />} label={t("checkout.cash")} />
                    <FormControlLabel value="Visa" control={<Radio />} label={t("checkout.visa")} />
                </RadioGroup>
            </FormControl>

            {paymentMethod === "Visa" && (
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleVisaConfirm)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 3 }}
                >
                    <TextField
                        fullWidth
                        {...register("cardNumber")}
                        label={t("checkout.cardNumber")}
                        placeholder="1234567812345678"
                        variant="outlined"
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber?.message}
                    />
                    <TextField
                        fullWidth
                        {...register("cardHolder")}
                        label={t("checkout.cardHolder")}
                        variant="outlined"
                        error={!!errors.cardHolder}
                        helperText={errors.cardHolder?.message}
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                            fullWidth
                            {...register("expiryDate")}
                            label={t("checkout.expiryDate")}
                            placeholder="MM/YY"
                            variant="outlined"
                            error={!!errors.expiryDate}
                            helperText={errors.expiryDate?.message}
                        />
                        <TextField
                            fullWidth
                            {...register("cvv")}
                            label={t("checkout.cvv")}
                            placeholder="123"
                            variant="outlined"
                            error={!!errors.cvv}
                            helperText={errors.cvv?.message}
                        />
                    </Box>

                    {isSuccess && (
                        <Alert severity="success">{t("checkout.success")}</Alert>
                    )}
                    {isError && (
                        <Alert severity="error">{t("checkout.error")}</Alert>
                    )}

                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        disabled={isPending || !data?.items?.length}
                    >
                        {isPending ? t("checkout.processing") : t("checkout.confirm")}
                    </Button>
                </Box>
            )}

            {paymentMethod === "Cash" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {isSuccess && (
                        <Alert severity="success">{t("checkout.success")}</Alert>
                    )}
                    {isError && (
                        <Alert severity="error">{t("checkout.error")}</Alert>
                    )}

                    <Button
                        variant="contained"
                        fullWidth
                        disabled={isPending || !data?.items?.length}
                        onClick={handleCashConfirm}
                    >
                        {isPending ? t("checkout.processing") : t("checkout.confirm")}
                    </Button>
                </Box>
            )}
        </Box>
    )
}