import * as formApis from '@/apis/form';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Collapse, Table } from 'antd';
import Link from 'next/link';
import { useToggle } from 'usehooks-ts';
import FormCreationDialog from './FormCreationDialog';

export default function FormList() {
    const { data, isLoading, error } = formApis.useFormList();
    const [formCreationDialogShown, toggleFormCreationDialogShown] = useToggle(false)

    if (error) return "Fetch error: " + error.message;

    return (<>
        <Collapse activeKey={['my-forms']} items={[
            {
                key: 'my-forms',
                label: '我的表单',
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
                                render(name, form) {
                                    return (
                                        <Link href={`/form/design/${form.id}`}>{name}</Link>
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
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={toggleFormCreationDialogShown}>新建工作流</Button>
                )
            }
        ]} />
        <FormCreationDialog
            open={formCreationDialogShown} 
            onClose={toggleFormCreationDialogShown}
        />
    </>)
}