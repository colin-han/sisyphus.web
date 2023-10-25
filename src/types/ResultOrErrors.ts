import NetworkError from "@/types/NetworkError";

export default interface ResultOrErrors<TResult, TError> {
    success: boolean;
    result?: TResult;
    errors?: TError[];
    networkError?: NetworkError;
}