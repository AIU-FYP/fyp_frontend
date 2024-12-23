import type {AxiosInstance} from "axios";
import axios from "axios";

export function createApi() {
    const config = useRuntimeConfig();

    if (config.public.isDev) {
        return constructApi('http://localhost:8000/api');
    }

    return constructApi('https://younesdjelloul.pythonanywhere.com');
}

function constructApi(baseUrl: string) {
    let api: AxiosInstance;

    api = axios.create({
        baseURL: baseUrl
    });

    api.interceptors.request.use((config) => {
        return config;
    });
    return api;
}

export function useApi() {
    return createApi()
}