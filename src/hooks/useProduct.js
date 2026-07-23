import { useQuery } from "@tanstack/react-query"
import authAxiosInstance from "../api/authAxiosInstance"

export default function useProduct(id) {
    const getProduct = async () => {
        const response = await authAxiosInstance.get(`/Products/${id}`);
        return response.data;
    }

    const query = useQuery({
        queryKey: ['product', id],
        queryFn: getProduct,
        staleTime: 1000 * 60 * 5,
    });

    return query;
}