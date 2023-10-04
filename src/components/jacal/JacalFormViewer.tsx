import type {JacalForm, JacalFormItem} from "@/components/jacal/jacal-model";
import {Button, Form, Input, InputNumber, Switch, Typography} from "antd";
import {Variables} from "@/types/variable";
import _ from "lodash";
import {useCallback, useState} from "react";

export interface JacalFormProps {
    formId: number;
    model: JacalForm;
    initialValues: Variables;
    showStop?: boolean;

    onContinues: (values: Variables) => Promise<void>
    onStop: () => void;
}

function renderItemEditor(item: JacalFormItem) {
    const label = item.title || _.startCase(item.name);
    const rules = item.required ? [{required: true}] : [];

    switch (item.type?.name) {
        case 'TEXT':
            return <Form.Item key={item.name}
                              name={item.name}
                              label={label}
                              rules={rules}>
                <Input/>
            </Form.Item>;
        case 'NUMBER':
            return <Form.Item key={item.name}
                              name={item.name}
                              label={label}
                              rules={rules}>
                <InputNumber/>
            </Form.Item>;
        case 'TOGGLE':
            return <Form.Item key={item.name}
                              name={item.name}
                              label={label}
                              rules={rules}>
                <Switch/>
            </Form.Item>
        default:
            return <Typography.Text type="danger">Unknown form item type.</Typography.Text>
    }
}

export default function JacalFormViewer(props: JacalFormProps) {
    const [loading, setLoading] = useState(false);

    const handleContinues = useCallback((values: Record<string, unknown>) => {
        let allValues = _.fromPairs(
            props.model.items
                .map(v => ([v.name, {type: v.type.valueType, value: values[v.name]}]))
        );
        setLoading(true);
        props.onContinues(allValues).then(() => setLoading(false));
    }, [props]);

    return (
        <Form
            name={`Form_${props.formId}`}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={_.mapValues(props.initialValues, "value")}
            onFinish={handleContinues}
        >
            {props.model.items.map(renderItemEditor)}
            <Form.Item wrapperCol={{span: 24}}>
                {props.showStop && <Button onClick={props.onStop}>终止流程</Button>}
                <Button htmlType="submit" type="primary">继续流程</Button>
            </Form.Item>
        </Form>
    )
}