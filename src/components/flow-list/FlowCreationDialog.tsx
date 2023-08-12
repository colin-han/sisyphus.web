import { Button, Form, Input, Modal } from "antd";
import { useCallback } from "react";
import * as flowApis from '@/apis/flow';

interface FlowCreationDialogProps {
    open?: boolean;
    onClose?: () => void;
}

export default function FlowCreationDialog(props: FlowCreationDialogProps) {
    const [form] = Form.useForm();

    const handleFlowCreation = useCallback(() => {
        flowApis.createFlow(form.getFieldValue("name"), form.getFieldValue("description"));
    }, [form])

    return (
        <Modal
            title="Create Flow"
            open={props.open}
            onOk={handleFlowCreation}
        >
            <Form
                form={form}
                name="flow-creation"
                onFinish={handleFlowCreation}
            >
                <Form.Item 
                    name="name" 
                    label="名称" 
                    rules={[
                        { required: true, message: '请输入工作流名称' },
                        { pattern: /^\w[\w0-9\-_.]*$/, message: "请输入字母、数字、连字符 ('-'、'_')。" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="描述"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    )
}