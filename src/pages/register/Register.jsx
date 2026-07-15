import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Register() {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const registerSchema = yup.object({
        userName: yup.string().required(),
        fullName: yup.string().required(),
        email: yup.string().required(),
        phoneNumber: yup.string().required(),
        password: yup.string().required(),
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(registerSchema)
    });

    const RegisterForm = async(data)=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Register`, data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <Box component="section" className="registerPage">
            <Typography component="h1" variant="h2">
                {t("auth.registerTitle")}
            </Typography>
            <Box onSubmit={handleSubmit(RegisterForm)} component="form" sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    {...register("userName")}
                    label={t("auth.userName")}
                    variant="outlined"
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                />
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
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button variant="contained" type="submit">
                    {t("auth.registerButton")}
                </Button>
            </Box>
        </Box>
    )
}