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
import useAuthStore from '../../store/useAuthStore';

export default function Login() {

    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);

    const loginSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(loginSchema)
    });

    const LoginForm = async(data)=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Login`, data);
            const token = response.data.accessToken;
            setToken(token);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <Box component="section" className="LoginPage">
            <Typography component="h1" variant="h2">
                Login
            </Typography>
            <Box onSubmit={handleSubmit(LoginForm)} component="form" sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    {...register("email")}
                    label="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    fullWidth
                    {...register("password")}
                    label="password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button variant="contained" type="submit">
                    Login
                </Button>
            </Box>
        </Box>
    )
}