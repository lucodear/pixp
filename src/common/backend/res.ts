export interface ResponseOptions {
    status?: number;
    statusText?: string;
    headers?: Headers;
}

export enum ErrorType {
    NotFound = 404,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    InternalServerError = 500
}

const from = (payload: string | object, { status, statusText, headers }: ResponseOptions = {}) => {
    headers = headers ?? new Headers();

    if (!headers.has('content-type')) {
        headers.set('content-type', 'application/json');
    }

    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);

    return new Response(body, {
        status,
        statusText,
        headers
    });
};

const err = (type: ErrorType, message: string) =>
    from(JSON.stringify({ code: type, message }), { status: Number(type) });

export default {
    from,
    err
};
