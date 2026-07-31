import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/useAuthStore';

export default function Login() {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const setToken = useAuthStore((state) => state.setToken);
    const [showPassword, setShowPassword] = useState(false);

    const loginSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const LoginForm = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Login`, data);
            const token = response.data.accessToken;
            setToken(token);
            navigate("/");
        } catch (err) {
            console.log(err);
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
                    <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'bold', marginBottom: 2 }}>
                        {t("auth.heroTitleLine1")}
                        <br />
                        {t("auth.heroTitleLine2")}
                    </Typography>
                    <Typography sx={{ color: '#ccc3d7' }}>
                        {t("auth.loginHeroDescription")}
                    </Typography>
                </Box>
            </Box>

            {/* right side - form */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        ShopLux
                    </Typography>
                    <Typography variant="h5" sx={{ marginTop: 2 }}>
                        {t("auth.welcomeBack")}
                    </Typography>
                    <Typography color="text.secondary" sx={{ marginBottom: 4 }}>
                        {t("auth.pleaseEnterDetails")}
                    </Typography>

                    <Box
                        onSubmit={handleSubmit(LoginForm)}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            backgroundColor: 'background.paper',
                            padding: 4,
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <TextField
                            fullWidth
                            {...register("email")}
                            label={t("auth.email")}
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            autoComplete="new-email"
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

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Typography
                                component={Link}
                                to="/forgot-password"
                                sx={{ color: 'primary.main', textDecoration: 'none' }}
                            >
                                {t("auth.forgotPasswordLink")}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                background: 'linear-gradient(135deg, #6c2bd9 0%, #3e008e 100%)',
                                padding: 1.5,
                                borderRadius: 2,
                            }}
                        >
                            {t("auth.loginButton")}
                        </Button>
                    </Box>

                    <Typography sx={{ textAlign: 'center', marginTop: 3 }}>
                        {t("auth.dontHaveAccount")}{" "}
                        <Box component={Link} to="/register" sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}>
                            {t("auth.createAnAccount")}
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}