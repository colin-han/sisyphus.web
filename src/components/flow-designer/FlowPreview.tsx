import { useEffect, useState } from "react";
import * as flowApis from '@/apis/flow';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchHandlers } from "react-zoom-pan-pinch";
import { Spin } from "antd";
import ErrorView from "../error/ErrorView";

export interface FlowPreviewProps {
    loading: boolean;
    svg: string;
}

export default function FlowPreview({ loading, svg }: FlowPreviewProps) {
    if (loading) {
        return <Spin />
    }

    function Viewer({ zoomToElement }: ReactZoomPanPinchHandlers) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(() => zoomToElement('flow-viewer'), [zoomToElement, svg]);

        return (<>
            <TransformComponent wrapperStyle={{height: '100%', width: '100%'}}>
                <div id='flow-viewer' dangerouslySetInnerHTML={{ __html: svg! }} />
            </TransformComponent>
        </>);
    }

    return (
        <TransformWrapper
            minScale={0.2}
            centerZoomedOut={false}
            centerOnInit={true}
        >
            {Viewer}
        </TransformWrapper>
    );
}