import useSWR, { SWRResponse } from 'swr';
import fetcher from './fetcher';
import { PublicConfiguration } from 'swr/_internal';
import {FormInfo} from "@/types/form";
import {JacalForm} from "@/components/jacal/jacal-model";
import {ParseError} from "@/types/ParseError";

const disableAutoRefresh: Partial<PublicConfiguration<any, any, any>> = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
}

export function useFormList(): SWRResponse<FormInfo[], Error> {
    return useSWR<FormInfo[]>('/forms/', fetcher, { refreshInterval: 10000 });
}

export async function createForm(name: string, description: string) {
    return fetcher<FormInfo>('/forms/', { method: 'post', body: JSON.stringify({name, description})});
}

export function useForm(id: number) {
    return useSWR<FormInfo>(id ? `/forms/${id}` : undefined, fetcher, disableAutoRefresh)
}

export function updateForm(id: number, flow: FormInfo) {
    return fetcher<void>(`/forms/${id}`, { method: 'put', body: JSON.stringify(flow)});
}

export interface JacalModelParseResponse {
    success: boolean;
    model?: JacalForm;
    errors?: ParseError[];
}
export function parseModel(id: number, code: string) {
    return fetcher<JacalModelParseResponse>(`/forms/${id}/model`, { method: 'post', body: JSON.stringify({code})});
}