import * as formApis from "@/apis/form";
import ErrorView from "@/components/error/ErrorView";
import { Spin } from "antd";
import {useEffect, useState } from "react";
import JacalFormViewer from "@/components/jacal/JacalFormViewer";
import {JacalForm} from "@/components/jacal/jacal-model";

interface FormPreviewProps {
    formId: number;
    code: string;
}

export default function FormPreview({formId, code}: FormPreviewProps) {
    const [loading, setLoading] = useState(true);
    const [model, setModel] = useState<JacalForm>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        formApis.parseModel(formId, code ?? '')
            .then(info => {
                if (info.error) {
                    setError(new Error(info.error));
                } else {
                    setModel(info.model);
                    setError(null);
                }
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, [formId, code]);

    if (loading) {
        return <Spin />
    }

    if (error) {
        return <ErrorView error={error} />;
    }

    return <JacalFormViewer formId={formId}
                            model={model!}
                            initialValues={{}}
                            onContinues={async () => {}}
                            onStop={() => {}}
                            showStop={false}/>;
}