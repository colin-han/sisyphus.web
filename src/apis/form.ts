import useSWR from './useSWR';
import fetcher from './fetcher';
import { PublicConfiguration } from 'swr/_internal';
import {FormInfo} from "@/types/form";
import {JacalForm} from "@/components/jacal/jacal-model";
import useCompileResource from "@/apis/useCompileResource";

const disableAutoRefresh: Partial<PublicConfiguration<any, any, any>> = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
}

export function useFormList() {
    return useSWR<FormInfo[]>('/forms/', { refreshInterval: 10000 });
}

export async function createForm(name: string, description: string) {
    return fetcher<FormInfo>('/forms/', { method: 'post', body: JSON.stringify({name, description})});
}

export function useForm(id: number) {
    return useSWR<FormInfo>(id ? `/forms/${id}` : undefined, disableAutoRefresh)
}

export function updateForm(id: number, flow: FormInfo) {
    return fetcher<void>(`/forms/${id}`, { method: 'put', body: JSON.stringify(flow)});
}

export function useJacalModel(id: number, code?: string) {
    return useCompileResource<JacalForm>(`/forms/${id}/model`, code);
}