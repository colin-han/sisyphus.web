import ParseError from "@/types/ParseError";

export default function ParseErrorLine({error}: { error: ParseError }) {
    return <span>[{error.line}, {error.column}]: {error.message}</span>;
}