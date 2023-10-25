import type {Fetcher, SWRConfiguration, SWRResponse} from "swr";
import {default as useOriginalSWR} from 'swr';
import fetcher from "@/apis/fetcher";
import NetworkError from "@/types/NetworkError";

export class FetchError<TError = unknown> extends Error {
    public errors?: TError[];
    public networkError?: NetworkError;

    constructor(errors?: TError[], networkError?: NetworkError) {
        super(`fetch errors: ${JSON.stringify(errors || networkError)} `);
        this.errors = errors;
        this.networkError = networkError;
    }
}

async function fetcher2<TResult, TError = unknown>(url: string, init?: RequestInit): Promise<TResult> {
    const res = await fetcher<TResult, TError>(url, init);
    if (res.success) {
        return res.result!;
    } else {
        throw new FetchError<TError>(res.errors, res.networkError);
    }
}

export default function useSWR<Data = any, Error = string>(key: string | undefined): SWRResponse<Data, FetchError<Error>>;
export default function useSWR<
    Data = any,
    Error = string,
    SWROptions extends SWRConfiguration<Data, FetchError<Error>, Fetcher<Data, string>> | undefined
        = SWRConfiguration<Data, FetchError<Error>, Fetcher<Data, string>> | undefined
>(key: string | undefined, config: SWROptions): SWRResponse<Data, FetchError<Error>, SWROptions>;
export default function useSWR<
    Data = any,
    Error = string,
    SWROptions extends SWRConfiguration<Data, FetchError<Error>, Fetcher<Data, string>> | undefined
        = SWRConfiguration<Data, FetchError<Error>, Fetcher<Data, string>> | undefined
>(key: string | undefined, config?: SWROptions): SWRResponse<Data, FetchError<Error>, SWROptions> {
    return useOriginalSWR<Data, FetchError<Error>, string | undefined, SWROptions>(key, fetcher2, config!);
}

export type {SWRConfiguration, SWRResponse};