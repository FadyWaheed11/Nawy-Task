import {Page} from "@playwright/test";

export class StorageHelper {

    // Inject the cart_id into the browser session
    static async setCartId(page: Page, cartId: string) {
        await page.evaluate((id) => {
            window.sessionStorage.setItem('cart_id', id);
        }, cartId);
    }

    // Get auth token from browser localStorage
    static async getAuthToken(page: Page): Promise<string> {
        await page.waitForFunction(() =>
            !!localStorage.getItem('auth-token')
        );

        const token = await page.evaluate(() =>
            localStorage.getItem('auth-token')
        );

        return token as string;
    }
}