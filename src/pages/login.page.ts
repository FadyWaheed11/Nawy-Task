import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    private emailInputLocator = this.page.locator('#email');
    private passwordInputLocator = this.page.locator('#password');
    private loginBtnLocator = this.page.getByRole('button', { name: 'login' });

    async login(email: string, password: string) {
        await this.emailInputLocator.fill(email);
        await this.passwordInputLocator.fill(password);
        await this.loginBtnLocator.click();
    }

    async validateLoginSuccess() {
        await expect(this.page).toHaveURL(/account/);
    }

    async getAuthToken(): Promise<string | null> {
        return await this.page.evaluate(() =>
            localStorage.getItem('auth-token')
        );
    }
}