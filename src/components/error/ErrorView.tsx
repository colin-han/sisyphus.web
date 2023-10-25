import { Typography } from "antd";
import NetworkError from "@/types/NetworkError";

export interface ErrorProps {
    error: Error | NetworkError;
}

export default function ErrorView(props: ErrorProps) {
    return (
        <Typography.Text type="danger">
            {props.error.message}
        </Typography.Text>
    );
}