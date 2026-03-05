import {createApiContext} from '../utils/apiClient';
import {API_ENDPOINTS} from "../utils/endpoints";

const cartEndpoint = API_ENDPOINTS.CARTS;

export async function createCart(token: string) {
    const apiContext = await createApiContext(token);

    const response = await apiContext.post(cartEndpoint);
    const body = await response.json();

    return {
        response,
        cartId: body.id as string,
    };
}

export async function addProductToCart(token: string, cartId: string, productId: string
) {
    const api = await createApiContext(token);

    return await api.post(`${cartEndpoint}/${cartId}`, {
        data: {
            product_id: productId,
            quantity: 1,
        },
    });
}