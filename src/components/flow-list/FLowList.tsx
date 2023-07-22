import * as flowApis from '@/apis/flow';
import { Collapse, Table } from 'antd';
import Link from 'next/link';

export default function FlowList() {
    const { data: res, isLoading, error } = flowApis.useFlowList();

    if (error) return "Fetch error: " + error.message;

    return (
        <Collapse activeKey={['my-flows']} items={[
            {
                key: 'my-flows',
                label: '我的工作流',
                children: (
                    <Table
                        loading={isLoading}
                        dataSource={res?.flows || []}
                        columns={[
                            {
                                title: '名称',
                                dataIndex: 'name',
                                key: 'name',
                                render(name, flow) {
                                    return (
                                        <Link href={`/flow-designer/${flow.id}`}>${name}</Link>
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
                )
            }
        ]} />
    )
}