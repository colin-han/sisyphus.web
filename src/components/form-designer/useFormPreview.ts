import {JacalForm} from "@/components/jacal/jacal-model";
import * as formApis from "@/apis/form";
import {useEffect, useState } from "react";
import {ParseError} from "@/types/ParseError";
import {JacalModelParseResponse} from "@/apis/form";

export default function useFormPreview(id: number, code?: string) {
    const [loading, setLoading] = useState(true);
    const [model, setModel] = useState<JacalForm>();
    const [errors, setErrors] = useState<ParseError[] | undefined>();

    function onBuildInfoChange(info: JacalModelParseResponse) {
        if (info.errors) {
            setErrors(info.errors!);
        } else {
            setModel(info.model!);
            setErrors(undefined);
        }
    }

    useEffect(() => {
        setLoading(true);

        formApis.parseModel(id, code ?? '')
            .then(onBuildInfoChange)
            .catch(e => onBuildInfoChange({success: false, errors: [{line: 0, column: 0, length: 0, message: e.message}]}))
            .finally(() => setLoading(false));
    }, [id, code]);

    return {
        loading,
        model,
        errors
    }
}