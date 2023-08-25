import FlowDesigner from "@/components/flow-designer/FlowDesigner";
import { Spin } from "antd";
import { useRouter } from 'next/router'

export default function Flows() {
    const router = useRouter();
    
    if (!router.query.flowId) {
        return (<Spin />);
    }
    
    const id = parseInt(router.query.flowId as string);

    return <FlowDesigner flowId={id} />;
}