import {Alert, Typography } from "antd";

import {ParseError} from "@/types/ParseError";

export interface ErrorProps {
    errors: ParseError[];
}

function getMessage(e: ParseError, index: number) {
    return <li key={index}>[{e.line}, {e.column}]: {e.message}</li>;
}

export default function ParseErrorView(props: ErrorProps) {
    return (<Alert message="错误"
                   description={<ul>{props.errors.map(getMessage)}</ul>}
                   type="error"/>);
}