import axios from "axios";
import type { Movie } from '../types/movie';
interface HttpResponse {
    results: Movie[];
    total_pages: number;
}
export default async function fetchMovies(topic: string, page: number): Promise<HttpResponse> {
    const token = import.meta.env.VITE_TMDB_TOKEN;    
    const url =
        `https://api.themoviedb.org/3/search/movie?query=${topic}&include_adult=false&language=en-US&page=${page}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    };    
    const response = await axios.get<HttpResponse>(url, options);
    return response.data;       
}

