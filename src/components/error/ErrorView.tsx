import {Alert, Typography } from "antd";
import {ParseError} from "@/apis/flow";

export interface ErrorProps {
    errors: ParseError[];
}

function getMessage(e: ParseError) {
    return `[${e.line}, ${e.column}]: ${e.message}`;
}

export default function ErrorView(props: ErrorProps) {
    return (<Alert message="错误"
                   description={props.errors.map(e => getMessage(e)).join('\n')}
                   type="error"/>);
}