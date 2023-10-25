import _ from 'lodash';
import ResultOrErrors from "@/types/ResultOrErrors";

export default async function fetcher<TResult, TError = string>(url: string, init?: RequestInit): Promise<ResultOrErrors<TResult, TError>> {
    const response = await fetch(process.env.BACKEND + url,
        _.assign({
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }, init),
    );
    if (response.ok) {
        return await response.json() as Promise<ResultOrErrors<TResult, TError>>;
    } else {
        return {
            success: false,
            errors: [],
            networkError: {
                type: 'network',
                message: `Error to fetch data, Response status: ${response.status} (${response.statusText})`,
                status: response.status
            }
        };
    }
}