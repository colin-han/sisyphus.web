import * as flowApis from '@/apis/flow';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Collapse, Table } from 'antd';
import Link from 'next/link';
import { useToggle } from 'usehooks-ts';
import FlowCreationDialog from './FlowCreationDialog';

export default function FlowList() {
    const { data, isLoading, error } = flowApis.useFlowList();
    const [flowCreationDialogShown, toggleFlowCreationDialogShown] = useToggle(false)

    if (error) return "Fetch error: " + error.message;

    return (<>
        <Collapse activeKey={['my-flows']} items={[
            {
                key: 'my-flows',
                label: '我的工作流',
                children: (
                    <Table
                        loading={isLoading}
                        dataSource={data ?? []}
                        rowKey="id"
                        columns={[
                            {
                                title: '名称',
                                dataIndex: 'name',
                                key: 'name',
                                render(name, flow) {
                                    return (
                                        <Link href={`/flow/design/${flow.id}`}>{name}</Link>
                                    )
                                }
                            },
                            {
                                title: '创建时间',
                                dataIndex: 'createdAt',
                                key: 'createdAt',
                            },
                            {
                                title: '最后修改时间',
                                dataIndex: 'updatedAt',
                                key: 'updatedAt',
                            },
                            {
                                title: '使用状态',
                                dataIndex: 'usage',
                                key: 'usage'
                            }
                        ]}
                    />
                ),
                extra: (
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={toggleFlowCreationDialogShown}>新建工作流</Button>
                )
            }
        ]} />
        <FlowCreationDialog 
            open={flowCreationDialogShown} 
            onClose={toggleFlowCreationDialogShown}
        />
    </>)
}