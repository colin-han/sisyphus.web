import { useEffect, useState } from "react";
import * as flowApis from '@/apis/flow';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchHandlers } from "react-zoom-pan-pinch";
import { Spin } from "antd";
import ErrorView from "../error/ErrorView";

export interface FlowPreviewProps {
    id: number;
    code?: string;
}

export default function FlowPreview({ id, code }: FlowPreviewProps) {
    const [loading, setLoading] = useState(true);
    const [svg, setSvg] = useState<string>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        flowApis.flowToSvg(id, code ?? '')
            .then(info => {
                if (info.error) {
                    setError(new Error(info.error));
                } else {
                    setSvg(info.svg);
                    setError(null);
                }
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, [id, code]);

    if (loading) {
        return <Spin />
    }

    if (error) {
        return <ErrorView error={error} />;
    }

    function Viewer({ zoomToElement }: ReactZoomPanPinchHandlers) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(() => zoomToElement('flow-viewer'), [zoomToElement, svg]);

        return (<>
            <TransformComponent wrapperStyle={{width: '100%', height: '100%'}}>
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