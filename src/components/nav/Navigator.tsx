'use client';

import { useParams, usePathname, useRouter } from "next/navigation";
import { Menu } from 'antd';
import { BoxPlotTwoTone, CreditCardTwoTone, HomeTwoTone } from "@ant-design/icons";

export default function Navigator() {
    const pathname = usePathname();
    const router = useRouter();
    const currentKeyEnd = pathname.substring(1).indexOf('/');
    const currentKey = (pathname.length === 1 || currentKeyEnd < 0) 
        ? pathname
        : pathname.substring(0, currentKeyEnd).toLocaleLowerCase();

    console.log(currentKeyEnd, currentKey);
    return (
        <Menu
            onClick={(e) => router.push(`${e.key}`)}
            selectedKeys={[currentKey]}
            mode="horizontal"
            items={[
                { label: '首页', key: '/', icon: < HomeTwoTone /> },
                { label: '表单设计器', key: '/forms', icon: <CreditCardTwoTone /> },
                { label: '工作流设计器', key: '/flows', icon: <BoxPlotTwoTone /> }
            ]}
        />
    );
}