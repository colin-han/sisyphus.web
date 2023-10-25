import useSWR from "./useSWR";

export interface FlowWithProgram {
    id: number;
    name: string;
    description: string;
    programs: ProgramInfo[];
}

export interface ProgramInfo {
    id: number;
    name: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export function useProgramList() {
    return useSWR<FlowWithProgram[]>('/programs/');
}