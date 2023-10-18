import * as flowApis from "@/apis/flow";
import {useEffect, useState } from "react";
import {SvgInfo} from "@/apis/flow";

export default function useFlowPreview(id: number, code?: string) {
    const [loading, setLoading] = useState(true);
    const [buildInfo, setBuildInfo] = useState<SvgInfo>();
    const [svg, setSvg] = useState<string>('');

    function onBuildInfoChange(buildInfo: SvgInfo) {
        if (buildInfo.success) {
            setSvg(buildInfo.svg!);
        }
        setBuildInfo(buildInfo);
    }

    useEffect(() => {
        setLoading(true);
        flowApis.flowToSvg(id, code ?? '')
            .then(onBuildInfoChange)
            .catch(e => onBuildInfoChange({success: false, errors: [{line: 0, column: 0, length: 0, message: e.message}]}))
            .finally(() => setLoading(false));
    }, [id, code]);

    return { loading, svg, errors: buildInfo?.errors };
};