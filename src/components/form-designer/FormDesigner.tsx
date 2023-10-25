'use client';
import * as formApis from '@/apis/form';
import {Skeleton, Button, message} from "antd";
import s from './FormDesigner.module.css';
import {useEffect, useState} from "react";
import {FormInfo} from "@/types/form";
import Panel from '../panel/Panel';
import FormPreview from "@/components/form-designer/FormPreview";
import ErrorView from "@/components/error/ErrorView";
import FormEditor from './FormEditor';
import ParseErrorView from "@/components/error/ParseErrorView";

interface FormDesignerProps {
    formId: number;
}

export default function FormDesigner({formId}: FormDesignerProps) {
    const {data: res, isLoading, error} = formApis.useForm(formId);
    const [form, setForm] = useState<FormInfo>();
    const {
        loading,
        result,
        compileErrors,
        networkError
    } = formApis.useJacalModel(formId, form?.code);

    useEffect(() => {
        if (res) setForm(res);
    }, [res])

    function handleUpdateCode(code?: string) {
        setForm((f?: FormInfo) => ({...f!, code: code ?? ''}));
    }

    function handleSaveForm() {
        formApis.updateForm(formId, form!)
            .then(() => message.success("保存成功！"))
            .catch(() => message.error("保存失败！"));
    }

    if (error) {
        return <ErrorView error={error}/>
    }

    if (isLoading) {
        return <Skeleton/>
    }

    return (
        <div className={s.root}>
            <Panel className={s.designerPanel} header="表单编辑">
                <FormEditor onChange={handleUpdateCode} code={form?.code ?? ''} errors={compileErrors}/>
            </Panel>
            <Panel
                className={s.previewPanel}
                header="预览"
                actions={<div><Button size="small" style={{margin: -1}} onClick={handleSaveForm}>保存</Button></div>}
            >
                <div className={s.previewContainer}>
                    <div className={s.preview}>
                        <FormPreview formId={formId} model={result!} loading={loading}/>
                    </div>
                    <div className={s.error}>
                        <ParseErrorView compileErrors={compileErrors} networkError={networkError}/>
                    </div>
                </div>
            </Panel>
        </div>
    )
}