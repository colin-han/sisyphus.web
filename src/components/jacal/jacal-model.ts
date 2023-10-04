import {VariableType} from "@/types/variable";

export interface JacalForm {
    items: JacalFormItem[];
}

export interface JacalFormItem {
    name: string;
    title?: string;
    type: JacalFormItemType;
    required?: boolean;
}

export interface JacalFormItemType {
    name: string;
    valueType: VariableType;
}
