import ParseError from "@/types/ParseError";

export default interface FlowError {
    sourceType: string;
    source: string;
    errors: ParseError[];
}