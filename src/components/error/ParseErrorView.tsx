import {Alert} from "antd";
import ParseError from "@/types/ParseError";
import ParseErrorLine from "@/components/error/ParseErrorLine";
import NetworkError from "@/types/NetworkError";

export interface ErrorProps {
    compileErrors?: ParseError[];
    networkError?: NetworkError;
}

function getMessage(e: ParseError, index: number) {
    return <li key={index}><ParseErrorLine error={e}/></li>;
}

export default function ParseErrorView(props: ErrorProps) {
    if (!props.networkError && !props.compileErrors?.length) return null;

    return (<Alert message="错误"
                   description={<ul>
                       {props.networkError && <li>{props.networkError.message}</li>}
                       {props.compileErrors?.map(getMessage)}
                   </ul>}
                   type="error"/>);
}