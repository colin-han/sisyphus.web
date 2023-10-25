import FlowError from "@/types/FlowError";
import ParseErrorLine from "@/components/error/ParseErrorLine";

export default function FlowErrorLine({error}: {
    error: FlowError;
}) {
    return (
        <span>
            <div>Source: {error.source}</div>
            <ul>
                {error.errors.map((e, i) => (<li key={i}><ParseErrorLine error={e}/></li>))}
            </ul>
        </span>
    );
}