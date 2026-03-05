import { request, APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://api.practicesoftwaretesting.com';

export async function createApiContext(token?: string): Promise<APIRequestContext> {
    return await request.newContext({
        baseURL: BASE_URL,
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });
}