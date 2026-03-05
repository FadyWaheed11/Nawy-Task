import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {}

    private proceedBtnLocator = this.page.getByRole('button', { name: 'Proceed to checkout' });
    private streetFieldLocator = this.page.locator('#street');
    private cityFieldLocator = this.page.locator('#city');
    private stateFieldLocator = this.page.locator('#state');
    private countryFieldLocator = this.page.locator('#country');
    private postcodeFieldLocator = this.page.locator('#postal_code');
    private paymentListLocator = this.page.locator('#payment-method');
    private confirmBtnLocator = this.page.getByRole('button', { name: 'Confirm' });
    private successMessageLocator = this.page.locator('[data-test="payment-success-message"]');

    async proceedToBillingForm() {
        await expect(this.proceedBtnLocator).toBeVisible();
        await this.proceedBtnLocator.click();
        await this.proceedBtnLocator.click();
    }

    async fillBillingAddress(street:string,city:string,state:string,country:string,postCode:string) {
        await expect(this.streetFieldLocator).toBeVisible();

        await this.streetFieldLocator.fill(street);
        await this.cityFieldLocator.fill(city);
        await this.stateFieldLocator.fill(state);
        await this.countryFieldLocator.fill(country);
        await this.postcodeFieldLocator.fill(postCode);
    }

    async proceedToPayment() {
        await expect(this.proceedBtnLocator).toBeVisible();
        await this.proceedBtnLocator.click();
    }

    async selectCashPayment() {
        await expect(this.paymentListLocator).toBeVisible();
        await this.paymentListLocator.selectOption({
            label: 'Cash on Delivery',
        });
    }

    async confirmOrder() {
        await expect(this.confirmBtnLocator).toBeEnabled();
        await this.confirmBtnLocator.click();
    }

    async validateSuccessfulOrder(){
        await expect(this.successMessageLocator).toBeVisible();
        await expect(this.successMessageLocator).toContainText('Payment was successful');
    }
}
