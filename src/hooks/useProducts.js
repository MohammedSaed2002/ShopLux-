import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BURL}/Products`);
            return response.data;
        }
    });
}