import * as formApis from "@/apis/form";
import ParseErrorView from "@/components/error/ParseErrorView";
import { Spin } from "antd";
import {useEffect, useState } from "react";
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