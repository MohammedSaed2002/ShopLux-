import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useProduct(id) {
    const getProduct = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BURL}/Products/${id}`);
        return response.data;
    }

    const query = useQuery({
        queryKey: ['product', id],
        queryFn: getProduct,
        staleTime: 1000 * 60 * 5,
    });

    return query;
}