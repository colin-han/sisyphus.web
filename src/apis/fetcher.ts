import { Response  } from '@/types/http';

export default async function fetcher<T>(key: string): Promise<T> {
    const response = await fetch(process.env.BACKEND + key, {
        credentials: 'include'
    });
    if (response.ok) {
        const res = await response.json() as Response<T>;
        if (res.success) {
            return res.data;
        } else {
            throw new Error(res.error);
        }
    } else {
        throw new Error(`Error to fetch data, Response status: ${response.status} (${response.statusText})`);
    }
}