'use client';
import * as flowApis from '@/apis/flow';
import ParseErrorView from "../error/ParseErrorView";
import {Skeleton, Button, message} from "antd";
import s from './FlowDesigner.module.css';
import {useEffect, useState} from "react";
import {FlowInfo} from "@/types/flow";
import FlowPreview from './FlowPreview';
import Panel from '../panel/Panel';
import useFlowPreview from "@/components/flow-designer/useFlowPreview";
import FlowEditor from "@/components/flow-designer/FlowEditor";
import ErrorView from "@/components/error/ErrorView";

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

    function handleUpdateCode(code?: string) {
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
            <Panel className={s.designerPanel} header="流程图编辑">
                <FlowEditor onChange={handleUpdateCode} code={flow?.code ?? ''} errors={errors} />
            </Panel>
            <Panel
                className={s.previewPanel}
                header="预览"
                actions={<div><Button size="small" style={{margin: -1}} onClick={handleSaveFlow}>保存</Button></div>}
            >
                <div className={s.previewContainer}>
                    <div className={s.preview}>
                        <FlowPreview loading={loading} svg={svg}/>
                    </div>
                    <div className={s.error}>
                        {errors && <ParseErrorView errors={errors}/>}
                    </div>
                </div>
            </Panel>
        </div>
    )
}