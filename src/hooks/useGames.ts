import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface Platform {
    id: number;
    name: string;
    slug: string;
  }
  

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;

}

interface FetchGamesResponse {
    count: number;
    results: Game[];
}

export const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchGames = async () => {
            try {
                const response = await apiClient.get<FetchGamesResponse>("/games", { cancelToken: source.token });
                setGames(response.data.results);
            } catch (err) {
                if (err instanceof CanceledError) {
                    console.log("Request canceled");
                } else {
                    setError("Failed to fetch games. Please check your API key or network.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchGames();

        return () => {
            source.cancel("Request canceled");
        };
    }, []);

    return { games, loading, error };
};