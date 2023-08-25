'use client';

import { usePathname, useRouter } from "next/navigation";
import { Menu } from 'antd';
import { BoxPlotTwoTone, CreditCardTwoTone, HomeTwoTone } from "@ant-design/icons";

function useCategory() {
    const pathname = usePathname();
    if (!pathname) {
        return '/';
    }

    const currentKeyEnd = pathname.substring(1).indexOf('/');
    const currentKey = (pathname.length === 1 || currentKeyEnd < 0)
        ? pathname
        : pathname.substring(0, currentKeyEnd + 1).toLocaleLowerCase();

    console.log(currentKeyEnd, currentKey);
    return currentKey;
}

export default function Navigator() {
    const router = useRouter();
    const currentKey = useCategory();

    return (
        <Menu
            onClick={(e) => router.push(`${e.key}`)}
            selectedKeys={[currentKey]}
            mode="horizontal"
            items={[
                { label: '首页', key: '/', icon: < HomeTwoTone /> },
                { label: '表单设计器', key: '/form', icon: <CreditCardTwoTone /> },
                { label: '工作流设计器', key: '/flow', icon: <BoxPlotTwoTone /> }
            ]}
        />
    );
}