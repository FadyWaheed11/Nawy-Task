import {generateRandomEmail} from "../utils/dataGenerator";

export function buildUserData() {
    return {
        email: generateRandomEmail(),
        password: 'Nawy@12345',
        firstName: 'Nawy',
        lastName: 'User',
    };
}