import type { IValidationErrorResponse } from '@/types/api';

export class ApiError extends Error {
    readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

export class ValidationError extends ApiError {
    readonly errors: IValidationErrorResponse['errors'];

    constructor(payload: IValidationErrorResponse) {
        super(422, payload.message);
        this.name = 'ValidationError';
        this.errors = payload.errors;
    }
}

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

async function request<T>(method: Method, path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`/api${path}`, {
        method,
        signal,
        headers: {
            Accept: 'application/json',
            ...(body !== undefined && { 'Content-Type': 'application/json' }),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (response.status === 204) {
        return undefined as T;
    }

    const payload = await response.json().catch(() => null);

    if (response.status === 422) {
        throw new ValidationError(payload);
    }

    if (!response.ok) {
        throw new ApiError(response.status, payload?.message ?? response.statusText);
    }

    return payload as T;
}

export function handleApiError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    return 'An unknown error occurred.';
}

export const http = {
    get: <T>(path: string, signal?: AbortSignal) => request<T>('GET', path, undefined, signal),
    post: <T>(path: string, body: unknown) => request<T>('POST', path, body),
    patch: <T>(path: string, body: unknown) => request<T>('PATCH', path, body),
    delete: (path: string) => request<void>('DELETE', path),
};
