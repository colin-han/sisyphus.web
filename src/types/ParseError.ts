export default interface ParseError {
    line: number;
    column: number;
    length: number;
    message: string;
}
