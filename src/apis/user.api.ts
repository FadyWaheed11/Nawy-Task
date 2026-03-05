import { createApiContext } from '../utils/apiClient';
import {API_ENDPOINTS} from "../utils/endpoints";

export async function createUser(email: string, password: string,firstName:string,lastName:string) {
    const createUserEndpoint = API_ENDPOINTS.REGISTER;
    const apiContext = await createApiContext();

    return await apiContext.post(createUserEndpoint, {
        data: {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
        },
    });
}