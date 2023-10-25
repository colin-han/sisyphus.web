import {FetchError} from "@/apis/useSWR";
import {ComponentType} from "react";
import ParseErrorLine from "@/components/error/ParseErrorLine";
import ParseError from "@/types/ParseError";
import FlowError from "@/types/FlowError";
import FlowErrorLine from "@/components/error/FlowErrorLine";

interface FetchErrorViewProps<TError> {
    error: FetchError<TError>;
    Component: ComponentType<{ error: TError }>;
}

export default function FetchErrorView<TError>({error, Component}: FetchErrorViewProps<TError>) {
    if ("errors" in error) {
        return (
            <ul>
                {error.networkError && <li>{error.networkError.message}</li>}
                {error.errors!.map((e, i) => (
                    <li key={i}>
                        <Component error={e}/>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <ul>
            <li>
                {error.message}
            </li>
        </ul>
    );
}

function buildFetchErrorView<TError>(name: string, Component: ComponentType<{ error: TError }>) {
    const comp = ({error}: { error: FetchError<TError> }) => <FetchErrorView error={error} Component={Component}/>;
    comp.displayName = `FetchErrorView.${name}`;
    return comp
}

FetchErrorView.String = buildFetchErrorView<string>('String', ({error}) => <span>{error}</span>);
FetchErrorView.ParseError = buildFetchErrorView<ParseError>('ParseError', ParseErrorLine);
FetchErrorView.FlowError = buildFetchErrorView<FlowError>('FlowError', FlowErrorLine);
