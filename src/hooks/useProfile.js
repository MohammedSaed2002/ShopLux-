import authAxiosInstance from '../api/authAxiosInstance.js';
import { useQuery } from '@tanstack/react-query';

export default function useProfile() {
    const getProfile = async () => {
        const response = await authAxiosInstance.get('/Profile');
        return response.data;
    }

    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: 1000 * 60 * 5
    });
}