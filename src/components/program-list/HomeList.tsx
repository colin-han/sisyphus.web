import {Button, Collapse, Popover, Skeleton, Space} from 'antd';
import type {FlowWithProgram} from '@/apis/program';
import * as programApis from '@/apis/program';
import ErrorView from "@/components/error/ErrorView";
import {EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import Link from 'next/link';
import {useState} from 'react';
import {ProgramCreationDialog} from "@/components/program-list/ProgramCreationDialog";
import {FlowErrorView} from "@/components/error/FlowErrorView";
import _ from 'lodash';
import {ProgramList} from "@/components/program-list/ProgramList";

export default function HomeList() {
    const [showCreationDialog, setShowCreationDialog] = useState<FlowWithProgram>();

    const {data: programList, error, isLoading} = programApis.useProgramList();
    if (isLoading) {
        return <Skeleton active />
    }

    if (error) {
        return <ErrorView error={error} />
    }

    const handleCreate = (flow: FlowWithProgram) => {
        setShowCreationDialog(flow);
    };

    const handleCreationClose = () => {
        setShowCreationDialog(undefined);
    }

    return (<>
        <Collapse ghost activeKey={programList?.flows?.map(f => f.id)}>
            {programList?.flows?.map(flow => (
                <Collapse.Panel
                    key={flow.id}
                    header={<Header flow={flow} />}
                    extra={<Extra flow={flow} onCreate={handleCreate} />}
                >
                    <ProgramList programs={flow.programs}
                                 variables={flow.variables}/>
                </Collapse.Panel>
            ))}
        </Collapse>
        <ProgramCreationDialog flow={showCreationDialog} onClose={handleCreationClose} />
    </>)
}

type HeaderProps = { flow: FlowWithProgram };

function Header({flow}: HeaderProps) {
    return <Space>
        <span>{flow.name}</span>
        {!_.isEmpty(flow.errors) && <Popover
            title="错误"
            content={<FlowErrorView errors={flow.errors} />}
            trigger="hover"
        >
            <ExclamationCircleOutlined style={{color: "red"}} />
        </Popover>}
        <Link href={`/flow/design/${flow.id}`}><EditOutlined /></Link>
    </Space>;
}


interface ExtraProps {
    flow: FlowWithProgram;
    onCreate: (flow: FlowWithProgram) => void;
}
function Extra(props: ExtraProps) {
    const handleCreate = () => props.onCreate(props.flow);

    return (
        <div>
            <Button onClick={handleCreate}><PlusOutlined /> 创建过程</Button>
        </div>
    )
}