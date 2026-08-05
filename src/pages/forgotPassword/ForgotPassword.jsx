import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import InputAdornment from '@mui/material/InputAdornment'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useSendCode from '../../hooks/useSendCode'
import useResetPassword from '../../hooks/useResetPassword'

const AtIcon = (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 8v5.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.6 7.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const MailIcon = (props) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m3.5 6 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LockIcon = (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const PinIcon = (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const ArrowRightIcon = (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowLeftIcon = (props) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

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

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,.04)",
            borderRadius: "10px",
            color: "#fff",
            "& fieldset": {
                borderColor: "rgba(255,255,255,.12)",
            },
            "&:hover fieldset": {
                borderColor: "rgba(255,255,255,.25)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#a78bfa",
            },
        },
        "& .MuiInputLabel-root": {
            color: "rgba(255,255,255,.5)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#a78bfa",
        },
    };

    const gradientButtonSx = {
        height: 48,
        borderRadius: "10px",
        background: "linear-gradient(90deg,#7c3aed 0%,#c4b5fd 100%)",
        color: "#1b0e33",
        fontWeight: 700,
        textTransform: "none",
        fontSize: "15px",
        boxShadow: "0 10px 25px -8px rgba(124,58,237,.6)",
        "&:hover": {
            background: "linear-gradient(90deg,#8b4bff 0%,#d4c4ff 100%)",
        },
        "&.Mui-disabled": {
            background: "rgba(124,58,237,.35)",
            color: "rgba(255,255,255,.4)",
        },
    };

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                overflow: "hidden",
                backgroundColor: "#0a0a0f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 6,
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-10%",
                    left: "-10%",
                    width: "45%",
                    height: "55%",
                    background: "radial-gradient(circle,rgba(124,58,237,.35) 0%,transparent 70%)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-15%",
                    right: "-10%",
                    width: "45%",
                    height: "55%",
                    background: "radial-gradient(circle,rgba(37,99,235,.3) 0%,transparent 70%)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    maxWidth: 440,
                    backgroundColor: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: "20px",
                    padding: { xs: 4, sm: 5 },
                    backdropFilter: "blur(10px)",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "radial-gradient(circle,rgba(124,58,237,.35) 0%,rgba(124,58,237,.1) 100%)",
                            border: "1px solid rgba(167,139,250,.3)",
                            color: "#c4b5fd",
                        }}
                    >
                        {step === 1 ? <MailIcon /> : <LockIcon width={28} height={28} />}
                    </Box>
                </Box>

                <Typography
                    component="h1"
                    sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "1.6rem",
                        background: "linear-gradient(90deg,#e9d5ff 0%,#c4b5fd 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1,
                    }}
                >
                    {step === 1 ? t("forgotPassword.title") : t("forgotPassword.step2Title", "Reset Password")}
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        color: "rgba(255,255,255,.55)",
                        fontSize: "14px",
                        lineHeight: 1.7,
                        mb: 4,
                        maxWidth: 320,
                        mx: "auto",
                    }}
                >
                    {step === 1 ? t("forgotPassword.step1Description") : t("forgotPassword.step2Description")}
                </Typography>

                {step === 1 && (
                    <Box component="form" onSubmit={handleSendCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            fullWidth
                            placeholder={t("auth.email")}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            variant="outlined"
                            sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box sx={{ color: "rgba(255,255,255,.4)", display: "flex" }}>
                                            <AtIcon />
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {sendErrorMessage && <Alert severity="error">{sendErrorMessage}</Alert>}

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSending}
                            endIcon={!isSending && <ArrowRightIcon />}
                            sx={gradientButtonSx}
                        >
                            {isSending ? t("forgotPassword.sending") : t("forgotPassword.sendCodeButton")}
                        </Button>
                    </Box>
                )}

                {step === 2 && (
                    <Box component="form" onSubmit={handleResetPassword} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <Alert severity="success" sx={{ borderRadius: "10px" }}>
                            {t("forgotPassword.codeSentSuccess")}
                        </Alert>

                        <TextField
                            fullWidth
                            placeholder={t("forgotPassword.code")}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            variant="outlined"
                            sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box sx={{ color: "rgba(255,255,255,.4)", display: "flex" }}>
                                            <PinIcon />
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            placeholder={t("forgotPassword.newPassword")}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            variant="outlined"
                            sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box sx={{ color: "rgba(255,255,255,.4)", display: "flex" }}>
                                            <LockIcon />
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {resetSuccess && <Alert severity="success" sx={{ borderRadius: "10px" }}>{t("forgotPassword.resetSuccess")}</Alert>}
                        {resetErrorMessage && <Alert severity="error" sx={{ borderRadius: "10px" }}>{resetErrorMessage}</Alert>}

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isResetting || resetSuccess}
                            endIcon={!isResetting && <ArrowRightIcon />}
                            sx={gradientButtonSx}
                        >
                            {isResetting ? t("forgotPassword.resetting") : t("forgotPassword.resetButton")}
                        </Button>
                    </Box>
                )}

                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 3,
                        textAlign: 'center',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                    }}
                >
                    <Link
                        to="/login"
                        style={{
                            color: "rgba(196,181,253,.85)",
                            textDecoration: "none",
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        <ArrowLeftIcon />
                        {t("forgotPassword.backToLogin")}
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}