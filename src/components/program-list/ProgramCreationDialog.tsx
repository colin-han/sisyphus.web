import * as programApis from "@/apis/program";
import {FlowWithProgram} from "@/apis/program";
import {Form, Input, Modal} from "antd";
import {useEffect, useState} from "react";
import {FlowErrorView} from "@/components/error/FlowErrorView";

interface ProgramCreationDialogProps {
    flow?: FlowWithProgram,
    onClose: () => void,
}

export function ProgramCreationDialog(props: ProgramCreationDialogProps) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [errors, setErrors] = useState(props.flow?.errors);

    useEffect(() => {
        setErrors(props.flow?.errors);
    }, [props.flow]);

    const handleProgramCreation = async () => {
        setLoading(true);
        const r = await programApis.createProgram(
            props.flow!.id,
            props.flow!.version,
            props.flow!.formVersions,
            form.getFieldValue("name")
        );
        setLoading(false);
        if (!r.success) {
            setErrors(r.errors);
        } else {
            props.onClose();
        }
    }

    return (
        <Modal
            title="Create Program"
            open={props.flow !== undefined}
            confirmLoading={loading}
            onOk={handleProgramCreation}
            onCancel={props.onClose}
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                form={form}
                name="flow-creation"
                onFinish={handleProgramCreation}
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
            </Form>
            {errors && <FlowErrorView errors={errors} />}
        </Modal>
    )
}