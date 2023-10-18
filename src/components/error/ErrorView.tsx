import { Typography } from "antd";

export interface ErrorProps {
    error: Error;
}

export default function ErrorView(props: ErrorProps) {
    return (
        <Typography.Text type="danger">
            {props.error.message}
        </Typography.Text>
    );
}