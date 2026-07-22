import React, { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import useCart from "../../hooks/useCart"
import useCheckout from "../../hooks/useCheckout"

export default function Checkout() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, isLoading } = useCart();
    const { mutate: checkout, isPending, isSuccess, isError } = useCheckout();
    const [paymentMethod, setPaymentMethod] = useState("Cash");

    if (isLoading) return <CircularProgress />

    const handleConfirm = () => {
        checkout(paymentMethod, {
            onSuccess: () => {
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        });
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

            {isSuccess && (
                <Alert severity="success" sx={{ marginBottom: 2 }}>
                    {t("checkout.success")}
                </Alert>
            )}
            {isError && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {t("checkout.error")}
                </Alert>
            )}

            <Button
                variant="contained"
                fullWidth
                disabled={isPending || !data?.items?.length}
                onClick={handleConfirm}
            >
                {isPending ? t("checkout.processing") : t("checkout.confirm")}
            </Button>
        </Box>
    )
}