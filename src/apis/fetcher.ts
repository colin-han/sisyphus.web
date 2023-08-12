import { Response  } from '@/types/http';
import _ from 'lodash';

export default async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(process.env.BACKEND + url, 
        _.assign({
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }, init),
    );
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