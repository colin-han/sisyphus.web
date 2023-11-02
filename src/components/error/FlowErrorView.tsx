import FlowError from "@/types/FlowError";
import { Alert } from "antd";
import FlowErrorLine from "@/components/error/FlowErrorLine";

export function FlowErrorView(props: { errors?: FlowError[] }) {
    if (!props.errors?.length) return null;

    return (<Alert message="错误"
                   description={<ul>
                       {props.errors?.map((e, i) => <FlowErrorLine key={i} error={e} /> )}
                   </ul>}
                   type="error"/>);
}