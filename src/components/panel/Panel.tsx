import cx from 'classnames';
import { CSSProperties, ReactNode } from "react";
import s from './panel.module.css';

export interface PanelProps {
    className?: string;
    style?: CSSProperties;
    header: string;
    children: ReactNode;
    actions?: ReactNode;
}

export default function Panel(props: PanelProps) {
    return (
        <div style={props.style} className={cx(s.panel, props.className)}>
            <div className={s.header}>
                <div className={s.title}>{props.header}</div>
                {props.actions && <div className={s.actions}>{props.actions}</div>}
            </div>
            <div className={s.content}>{props.children}</div>
        </div>
    );
}