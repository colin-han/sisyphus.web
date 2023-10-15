'use client';
import * as flowApis from '@/apis/flow';
import ErrorView from "../error/ErrorView";
import {Skeleton, Input, Button, message} from "antd";
import s from './FlowDesigner.module.css';
import {ChangeEvent, useEffect, useState} from "react";
import {FlowInfo} from "@/types/flow";
import FlowPreview from './FlowPreview';
import Panel from '../panel/Panel';
import useFlowPreview from "@/components/flow-designer/useFlowPreview";

interface FlowDesignerProps {
    flowId: number;
}

export default function FlowDesigner({flowId}: FlowDesignerProps) {
    const {data: res, isLoading, error} = flowApis.useFlow(flowId);
    const [flow, setFlow] = useState<FlowInfo>();
    const {svg, loading, errors} = useFlowPreview(flowId, flow?.code);

    useEffect(() => {
        if (res) setFlow(res);
    }, [res])

    function handleUpdateCode(e: ChangeEvent<HTMLTextAreaElement>) {
        const code: string = e.target.value || '';
        setFlow((f?: FlowInfo) => ({...f!, code: code ?? ''}));
    }

    function handleSaveFlow() {
        flowApis.updateFlow(flowId, flow!)
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
            <Panel className={s.designer} header="流程图编辑">
                <Input.TextArea
                    className={s.code}
                    value={flow?.code ?? ''}
                    onChange={handleUpdateCode}
                />
            </Panel>
            <Panel
                className={s.preview}
                header="预览"
                actions={<div><Button size="small" style={{margin: -1}} onClick={handleSaveFlow}>保存</Button></div>}
            >
                <div className={s.previewPanel}>
                    <FlowPreview loading={loading} svg={svg}/>
                    {errors && <ErrorView errors={errors}/>}
                </div>
            </Panel>
        </div>
    )
}