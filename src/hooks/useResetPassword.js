import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function useResetPassword() {
    return useMutation({
        mutationFn: async ({ email, code, newPassword }) => {
            return await axios.patch(`${import.meta.env.VITE_BURL}/auth/Account/ResetPassword`, {
                email,
                code,
                newPassword,
            });
        },
    });
}