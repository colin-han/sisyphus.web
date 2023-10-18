'use client';
import * as formApis from '@/apis/form';
import ParseErrorView from "../error/ParseErrorView";
import {Skeleton, Input, Button, message} from "antd";
import s from './FormDesigner.module.css';
import {ChangeEvent, useEffect, useState} from "react";
import {FormInfo} from "@/types/form";
import Panel from '../panel/Panel';
import FormPreview from "@/components/form-designer/FormPreview";

interface FormDesignerProps {
    formId: number;
}

export default function FormDesigner({formId}: FormDesignerProps) {
    const {data: res, isLoading, error} = formApis.useForm(formId);
    const [form, setForm] = useState<FormInfo>();

    useEffect(() => {
        if (res) setForm(res);
    }, [res])

    function handleUpdateCode(e: ChangeEvent<HTMLTextAreaElement>) {
        const code: string = e.target.value || '';
        setForm((f?: FormInfo) => ({...f!, code: code ?? ''}));
    }

    function handleSaveForm() {
        formApis.updateForm(formId, form!)
            .then(() => message.success("保存成功！"))
            .catch(() => message.error("保存失败！"));
    }

    if (error) {
        return <ParseErrorView error={error}/>
    }

    if (isLoading) {
        return <Skeleton/>
    }

    return (
        <div className={s.root}>
            <Panel className={s.designer} header="表单编辑">
                <Input.TextArea
                    className={s.code}
                    value={form?.code ?? ''}
                    onChange={handleUpdateCode}
                />
            </Panel>
            <Panel
                className={s.preview}
                header="预览"
                actions={<div><Button size="small" style={{margin: -1}} onClick={handleSaveForm}>保存</Button></div>}
            >
                <FormPreview formId={formId} code={form?.code ?? ''}/>
            </Panel>
        </div>
    )
}