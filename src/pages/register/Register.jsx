import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../api/axiosInstance';

export default function Register() {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const setToken = useAuthStore((state) => state.setToken);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const registerSchema = yup.object({
        userName: yup.string().required().min(3).max(20),
        fullName: yup.string().required(),
        email: yup.string().email().required(),
        phoneNumber: yup.string().required(),
        password: yup.string().required(),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const RegisterForm = async (data) => {
        setRegisterError("");
        setIsSubmitting(true);
        try {
            const response = await axiosInstance.post("/auth/Account/Register", data);
            const token = response.data.accessToken || response.data.token;
            setToken(token);
            navigate("/");
        } catch (err) {
            const serverMessage = err?.response?.data?.message;
            setRegisterError(serverMessage || t("auth.registerError"));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* left side - visual */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#100d16',
                    padding: 6,
                    textAlign: 'center',
                }}
            >
                <Box sx={{ maxWidth: 450 }}>
                    <Typography variant="h5" sx={{ color: '#fff', marginBottom: 2 }}>
                        {t("auth.heroTitleLine1")} {t("auth.heroTitleLine2")}
                    </Typography>
                    <Typography sx={{ color: '#ccc3d7' }}>
                        {t("auth.registerHeroDescription")}
                    </Typography>
                </Box>
            </Box>

            {/* right side - form */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        {t("auth.createYourAccount")}
                    </Typography>
                    <Typography color="text.secondary" sx={{ marginBottom: 3 }}>
                        {t("auth.pleaseFillDetails")}
                    </Typography>

                    <Box
                        onSubmit={handleSubmit(RegisterForm)}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2.5,
                            backgroundColor: 'background.paper',
                            padding: 4,
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <TextField
                            fullWidth
                            {...register("fullName")}
                            label={t("auth.fullName")}
                            variant="outlined"
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                        />
                        <TextField
                            fullWidth
                            {...register("userName")}
                            label={t("auth.userName")}
                            variant="outlined"
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
                            autoComplete="off"
                            inputProps={{ autoComplete: "new-username" }}
                        />
                        <TextField
                            fullWidth
                            {...register("email")}
                            label={t("auth.email")}
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            fullWidth
                            {...register("phoneNumber")}
                            label={t("auth.phoneNumber")}
                            variant="outlined"
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                        />
                        <TextField
                            fullWidth
                            {...register("password")}
                            label={t("auth.password")}
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            autoComplete="new-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            {...register("confirmPassword")}
                            label={t("auth.confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            variant="outlined"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            autoComplete="new-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControlLabel
                            control={<Checkbox required />}
                            label={t("auth.agreeToTerms")}
                        />

                        {registerError && <Alert severity="error">{registerError}</Alert>}

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                            sx={{
                                background: 'linear-gradient(135deg, #6c2bd9 0%, #d2bcff 100%)',
                                padding: 1.5,
                                borderRadius: 2,
                            }}
                        >
                            {isSubmitting ? t("auth.registering") : t("auth.registerNow")}
                        </Button>
                    </Box>

                    <Typography sx={{ textAlign: 'center', marginTop: 3 }}>
                        {t("auth.alreadyHaveAccount")}{" "}
                        <Box component={Link} to="/login" sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}>
                            {t("auth.loginTitle")}
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}