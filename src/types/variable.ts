export type VariableType = 'STRING' | 'NUMBER' | 'BOOLEAN';

export interface VariableDefine {
    name: string;
    type: VariableType;
}

export interface VariableValue {
    type: VariableType;
    value: unknown;
}

export interface Variable {
    name: string;
    value: VariableValue;
}

export type Variables = Record<string, VariableValue>;