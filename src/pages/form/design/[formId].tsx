import FormDesigner from "@/components/form-designer/FormDesigner";
import { Spin } from "antd";
import { useRouter } from 'next/router'

export default function Forms() {
    const router = useRouter();
    
    if (!router.query.formId) {
        return (<Spin />);
    }
    
    const id = parseInt(router.query.formId as string);

    return <FormDesigner formId={id} />;
}