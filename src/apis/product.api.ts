import { createApiContext } from '../utils/apiClient';
import {API_ENDPOINTS} from "../utils/endpoints";

export async function getProductByName(productName: string) {
    const apiContext = await createApiContext();
    const productSearchEndpoint = API_ENDPOINTS.PRODUCTS;

    const response = await apiContext.get(productSearchEndpoint+productName);
    const body = await response.json();

    //Make sure that the response is not empty
    if (!body.data || body.data.length === 0) {
        throw new Error(`Product not found: ${productName}`);
    }

    return body.data[0];
}