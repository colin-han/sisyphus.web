import type { Response } from '../types/http';
import type { FlowInfo } from '../types/flow';
import useSWR, { SWRResponse } from 'swr';
import fetcher from './fetcher';

export function useFlowList(): SWRResponse<{flows: FlowInfo[]}, Error> {
    return useSWR<{ flows: FlowInfo[] }>('/flows/', fetcher, { refreshInterval: 20 });
}

export async function createFlow(name: string, description: string) {
    return fetcher('/flows/', { method: 'post', body: JSON.stringify({name, description})});
}