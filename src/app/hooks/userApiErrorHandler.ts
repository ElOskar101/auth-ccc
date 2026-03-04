import {ApiError} from "@/app/types/error.type.ts";
import {toast} from "sonner";

export const useApiHandler = () => {
    const handleError = (error: unknown) => {
        if (error instanceof ApiError) {
            toast.warning(mapErrorMessage(error));
        } else {
            toast.warning('Unexpected error occurred');
        }
    };

    return { handleError };
};

export const mapErrorMessage = (error: ApiError) => {
    console.error(error.status)
    if (error.status >= 500)
        return 'Server error';
    return error.message || 'Unhandled error'
};