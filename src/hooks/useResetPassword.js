import axiosInstance from "../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function useResetPassword() {
    return useMutation({
        mutationFn: async ({ email, code, newPassword }) => {
            return await axiosInstance.patch("/auth/Account/ResetPassword", {
                email,
                code,
                newPassword,
            });
        },
    });
}