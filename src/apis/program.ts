import useSWR from "./useSWR";
import FlowError from "@/types/FlowError";
import fetcher from "@/apis/fetcher";

export function createProgram(flowId: number, flowVersion: number, formVersions: Record<string, number>, name: string) {
    return fetcher<ProgramInfo, FlowError>('/programs/', {
        method: 'PUT',
        body: JSON.stringify({
            flowId,
            flowVersion,
            formVersions,
            name
        })
    });
}


export interface FlowWithProgram {
    id: number;
    name: string;
    description: string;
    version: number;
    formVersions: Record<string, number>;
    updatedAt: Date;
    programs: ProgramInfo[];
    variables: VariableInfo[];
    errors: FlowError[];
}

export interface ProgramInfo {
    id: number;
    name: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface VariableInfo {
    name: string;
    type: string;
}

export function useProgramList() {
    return useSWR<{flows: FlowWithProgram[]}>('/programs/');
}