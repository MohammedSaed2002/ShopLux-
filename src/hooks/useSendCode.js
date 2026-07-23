import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function useSendCode() {
    return useMutation({
        mutationFn: async (email) => {
            return await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/SendCode`, { email });
        },
    });
}