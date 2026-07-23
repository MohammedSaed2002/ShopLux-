import authAxiosInstance from '../api/authAxiosInstance.js';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function useAddReview(productId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ rating, comment }) => {
            return await authAxiosInstance.post(`/Products/${productId}/reviews`, {
                Rating: rating,
                Comment: comment,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['product', productId]
            });
        },
    });
}