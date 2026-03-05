import { createApiContext } from '../utils/apiClient';
import {API_ENDPOINTS} from "../utils/endpoints";

const invoiceEndpoint = API_ENDPOINTS.INVOICES;

export async function createInvoice(token: string,
    payload: {
        billing_street: string;
        billing_city: string;
        billing_state: string;
        billing_country: string;
        billing_postal_code: string;
        payment_method: string;
        payment_details: object;
        cart_id: string;
    }
) {
    const apiContext = await createApiContext(token);

    const response = await apiContext.post(invoiceEndpoint, {
        data: payload,
    });

    const body = await response.json().catch(() => ({}));
    return {
        response,
        body,
    };
}