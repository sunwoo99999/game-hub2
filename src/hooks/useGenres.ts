import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
    id: number;
    name: string;
}
interface FetchGenresResponse {
    count: number;
    results: Genre[];
}
const useGenres = () => {    
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
        .get<FetchGenresResponse>("/games", { signal: controller.signal })
        .then((res) => { setGenres(res.data.results); 
            setLoading(false); }).catch((err) => { if(err instanceof CanceledError) return; 
                setError(err.message); setLoading(false); });

        return () => 
            controller.abort();
        }, []);


    return {genres, error, isLoading: loading };
};

export default useGenres;