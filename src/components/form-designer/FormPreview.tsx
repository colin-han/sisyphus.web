import { Spin } from "antd";
import JacalFormViewer from "@/components/jacal/JacalFormViewer";
import {JacalForm} from "@/components/jacal/jacal-model";

interface FormPreviewProps {
    formId: number;
    loading: boolean;
    model: JacalForm;
}

export default function FormPreview({formId, loading, model}: FormPreviewProps) {
    if (loading) {
        return <Spin />
    }

    return <JacalFormViewer formId={formId}
                            model={model!}
                            initialValues={{}}
                            onContinues={async () => {}}
                            onStop={() => {}}
                            showStop={false}/>;
}