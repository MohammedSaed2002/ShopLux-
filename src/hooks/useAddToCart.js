import { useMutation } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxiosInstance";

export default function useAddToCart() {
    return useMutation({
        mutationFn: async (values) => {
            return await authAxiosInstance.post('/Carts', {
                ProductId: values.productId,
                Count: values.count
            });
        }
    });
}