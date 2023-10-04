import { Button, Form, Input, Modal } from "antd";
import { useCallback } from "react";
import * as formApis from '@/apis/form';

interface FormCreationDialogProps {
    open?: boolean;
    onClose?: () => void;
}

export default function FormCreationDialog(props: FormCreationDialogProps) {
    const [form] = Form.useForm();

    const handleFormCreation = useCallback(() => {
        formApis.createForm(form.getFieldValue("name"), form.getFieldValue("description"));
    }, [form])

    return (
        <Modal
            title="Create Form"
            open={props.open}
            onOk={handleFormCreation}
            onCancel={props.onClose}
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                form={form}
                name="form-creation"
                onFinish={handleFormCreation}
            >
                <Form.Item
                    name="name"
                    label="名称"
                    rules={[
                        { required: true, message: '请输入表单名称' },
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