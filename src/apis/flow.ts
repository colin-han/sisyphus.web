import type {FlowInfo} from '@/types/flow';
import useSWR from './useSWR';
import fetcher from './fetcher';
import {PublicConfiguration} from 'swr/_internal';
import ParseError from "@/types/ParseError";
import useCompileResource from "@/apis/useCompileResource";

const disableAutoRefresh: Partial<PublicConfiguration<any, any, any>> = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
}

export function useFlowList() {
    return useSWR<FlowInfo[]>('/flows/', { refreshInterval: 10000 });
}


export async function createFlow(name: string, description: string) {
    return fetcher<FlowInfo>('/flows/', { method: 'post', body: JSON.stringify({name, description})});
}

export function useFlow(id: number) {
    return useSWR<FlowInfo>(id ? `/flows/${id}` : undefined, disableAutoRefresh)
}

export function updateFlow(id: number, flow: FlowInfo) {
    return fetcher<FlowInfo, ParseError>(`/flows/${id}`, { method: 'put', body: JSON.stringify(flow)});
}

export function useFlowSvg(id: number, code?: string) {
    return useCompileResource<string>(`/flows/${id}/svg`, code);
}
