import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useSendCode from '../../hooks/useSendCode'
import useResetPassword from '../../hooks/useResetPassword'

export default function ForgotPassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { mutate: sendCode, isPending: isSending, error: sendError } = useSendCode();
    const { mutate: resetPassword, isPending: isResetting, isSuccess: resetSuccess, error: resetError } = useResetPassword();

    const handleSendCode = (e) => {
        e.preventDefault();
        sendCode(email, {
            onSuccess: () => {
                setStep(2);
            }
        });
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        resetPassword(
            { email, code, newPassword },
            {
                onSuccess: () => {
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }
            }
        );
    };

    const sendErrorMessage = sendError?.response?.data?.message || (sendError ? t("forgotPassword.error") : null);
    const resetErrorMessage = resetError?.response?.data?.message || (resetError ? t("forgotPassword.error") : null);

    return (
        <Box component="section" sx={{ maxWidth: 450, margin: "0 auto" }}>
            <Typography component="h1" variant="h2" sx={{ marginBottom: 2 }}>
                {t("forgotPassword.title")}
            </Typography>

            {step === 1 && (
                <Box component="form" onSubmit={handleSendCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        {t("forgotPassword.step1Description")}
                    </Typography>

                    <TextField
                        fullWidth
                        label={t("auth.email")}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        variant="outlined"
                    />

                    {sendErrorMessage && <Alert severity="error">{sendErrorMessage}</Alert>}

                    <Button variant="contained" type="submit" disabled={isSending}>
                        {isSending ? t("forgotPassword.sending") : t("forgotPassword.sendCodeButton")}
                    </Button>
                </Box>
            )}

            {step === 2 && (
                <Box component="form" onSubmit={handleResetPassword} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Alert severity="success">{t("forgotPassword.codeSentSuccess")}</Alert>

                    <Typography variant="body2" color="text.secondary">
                        {t("forgotPassword.step2Description")}
                    </Typography>

                    <TextField
                        fullWidth
                        label={t("forgotPassword.code")}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label={t("forgotPassword.newPassword")}
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        variant="outlined"
                    />

                    {resetSuccess && <Alert severity="success">{t("forgotPassword.resetSuccess")}</Alert>}
                    {resetErrorMessage && <Alert severity="error">{resetErrorMessage}</Alert>}

                    <Button variant="contained" type="submit" disabled={isResetting || resetSuccess}>
                        {isResetting ? t("forgotPassword.resetting") : t("forgotPassword.resetButton")}
                    </Button>
                </Box>
            )}

            <Typography variant="body2" sx={{ marginTop: 3, textAlign: 'center' }}>
                <Link to="/login">{t("forgotPassword.backToLogin")}</Link>
            </Typography>
        </Box>
    )
}