import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import i18n from "../i18n";

const authAxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BURL}`,
});

authAxiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = i18n.language || "en";
    return config;
});

export default authAxiosInstance;