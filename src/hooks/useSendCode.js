import axiosInstance from "../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function useSendCode() {
    return useMutation({
        mutationFn: async (email) => {
            return await axiosInstance.post("/auth/Account/SendCode", { email });
        },
    });
}