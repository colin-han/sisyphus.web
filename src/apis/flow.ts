import type { FlowInfo } from '../types/flow';
import useSWR, { SWRResponse } from 'swr';
import fetcher from './fetcher';
import { PublicConfiguration } from 'swr/_internal';

const disableAutoRefresh: Partial<PublicConfiguration<any, any, any>> = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
}

export function useFlowList(): SWRResponse<FlowInfo[], Error> {
    return useSWR<FlowInfo[]>('/flows/', fetcher, { refreshInterval: 10000 });
}

export async function createFlow(name: string, description: string) {
    return fetcher<FlowInfo>('/flows/', { method: 'post', body: JSON.stringify({name, description})});
}

export function useFlow(id: number) {
    return useSWR<FlowInfo>(id ? `/flows/${id}` : undefined, fetcher, disableAutoRefresh)
}

export function updateFlow(id: number, flow: FlowInfo) {
    return fetcher<void>(`/flows/${id}`, { method: 'put', body: JSON.stringify(flow)});
}

export interface SvgInfo {
    svg: string;
    error: string;
}

export function flowToSvg(id: number, code: string) {
    return fetcher<SvgInfo>(`/flows/${id}/svg`, { method: 'post', body: JSON.stringify({code})});
}