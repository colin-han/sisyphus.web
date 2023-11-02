import {ProgramInfo, VariableInfo} from "@/apis/program";
import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useMemo } from "react";

interface ProgramListParams {
    programs: ProgramInfo[];
    variables: VariableInfo[];
}

export function ProgramList(props: ProgramListParams) {
    const columns: ColumnType<ProgramInfo>[] = useMemo(() => (
        [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建者',
                dataIndex: 'createdBy',
                key: 'createdBy',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
            {
                title: '修改时间',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
            },
        ]
    ), [])
    return <Table<ProgramInfo>
        columns={columns}
        dataSource={props.programs}
    />;
}