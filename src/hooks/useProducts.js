import { useQuery } from "@tanstack/react-query"
import authAxiosInstance from "../api/authAxiosInstance"

export default function useProducts({ sortBy, ascending } = {}) {
    return useQuery({
        queryKey: ["products", sortBy, ascending],
        queryFn: async () => {
            const response = await authAxiosInstance.get("/Products", {
                params: {
                    sortBy: sortBy || undefined,
                    ascending: ascending,
                }
            });
            return response.data;
        }
    });
}