interface FailedResponse {
    success: false;
    error: string;
}

interface SuccessResponse<T> {
    success: true;
    data: T
}

export type Response<T> = SuccessResponse<T> | FailedResponse;