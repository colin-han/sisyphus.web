export default interface NetworkError {
    type: 'network';
    message: string;
    status: number;
}