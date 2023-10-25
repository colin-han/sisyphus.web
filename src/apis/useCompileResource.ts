import {useEffect, useState} from "react";
import ParseError from "@/types/ParseError";
import fetcher from "@/apis/fetcher";
import ResultOrErrors from "@/types/ResultOrErrors";

export default function useCompileResource<TResult>(url: string, code?: string) {
    const [loading, setLoading] = useState(true);
    const [buildInfo, setBuildInfo] = useState<ResultOrErrors<TResult, ParseError>>();
    const [result, setResult] = useState<TResult>();

    useEffect(() => {
        setLoading(true);
        fetcher<TResult, ParseError>(url, {method: 'post', body: JSON.stringify({code: code ?? ''})})
            .then((buildInfo: ResultOrErrors<TResult, ParseError>) => {
                if (buildInfo.success) {
                    setResult(buildInfo.result);
                }
                setBuildInfo(buildInfo);
            })
            .finally(() => setLoading(false));
    }, [url, code]);

    return {loading, result, compileErrors: buildInfo?.errors, networkError: buildInfo?.networkError};
}