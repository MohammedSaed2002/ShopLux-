import authAxiosInstance from '../api/authAxiosInstance.js';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function useCheckout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (paymentMethod) => {
            return await authAxiosInstance.post('/Checkouts', {
                PaymentMethod: paymentMethod,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart']
            });
        },
    });
}