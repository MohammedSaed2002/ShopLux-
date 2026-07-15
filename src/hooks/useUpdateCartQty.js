import authAxiosInstance from '../api/authAxiosInstance.js';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function useUpdateCartQty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ productId, count }) => {
            return await authAxiosInstance.patch(`/Carts/${productId}`, {
                count: count,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart']
            });
        },
    });
}