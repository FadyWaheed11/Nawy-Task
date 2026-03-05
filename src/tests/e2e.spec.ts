import { test, expect } from '@playwright/test';
import { createUser } from '../apis/user.api';
import { createCart, addProductToCart } from '../apis/cart.api';
import { LoginPage } from '../pages/login.page';
import { getProductByName } from '../apis/product.api';
import { CheckoutPage } from '../pages/checkout.page';
import { createInvoice } from '../apis/invoice.api';
import {ROUTES} from "../utils/routes";
import {StorageHelper} from "../utils/storageHelper";
import {Product} from "../test-data/productData";
import {Billing} from "../test-data/billingData";
import {buildInvoicePayload} from "../test-data/invoiceData";
import {buildUserData} from "../test-data/userData";

test.describe('E2E Checkout Flow (UI + API)', () => {
    test('Complete end-to-end flow', async ({ page }) => {
        // shared test data
        const userData = buildUserData();
        const email = userData.email;
        const password = userData.password;
        const firstName = userData.firstName;
        const lastname = userData.lastName;

        let token: string;
        let cartId: string;
        let productId: string;

        // STEP 1: Create user via API
        await test.step('Create user via API', async () => {
            const userResponse = await createUser(email, password,firstName,lastname);
            const userBody = await userResponse.json();

            expect(userResponse.status()).toBe(201);
            expect(userBody.email).toBe(email);
            expect(userBody.first_name).toBeTruthy();
        });

        // STEP 2: Login via UI
        await test.step('Login via UI and validate session', async () => {
            await page.goto(ROUTES.LOGIN);

            const loginPage = new LoginPage(page);
            await loginPage.login(email, password);
            await loginPage.validateLoginSuccess();

            token = await StorageHelper.getAuthToken(page);
            expect(token).toBeTruthy();
        });

        // STEP 3: Add product to cart via API
        await test.step('Get product and add to cart via API', async () => {

            // get real product id
            const product = await getProductByName(Product.name);
            productId = product.id;
            expect(productId).toBeTruthy();

            // create cart
            const cartResponse = await createCart(token);
            cartId = cartResponse.cartId;
            expect(cartId).toBeTruthy();

            // link cart to UI session
            await StorageHelper.setCartId(page, cartId);

            // add product
            const addResponse = await addProductToCart(token, cartId, productId);

            expect(addResponse.status()).toBe(200);
            expect(addResponse.ok()).toBeTruthy();
        });

        // STEP 4: Complete checkout via UI
        await test.step('Complete payment via UI', async () => {
            await page.goto(ROUTES.CHECKOUT);

            const checkoutPage = new CheckoutPage(page);

            await checkoutPage.proceedToBillingForm();
            await checkoutPage.fillBillingAddress(
                Billing.street,
                Billing.city,
                Billing.state,
                Billing.country,
                Billing.postalCode
            );
            await checkoutPage.proceedToPayment();
            await checkoutPage.selectCashPayment();
            await checkoutPage.confirmOrder();
            await checkoutPage.validateSuccessfulOrder();
        });

        // STEP 5: Create invoice via API
        await test.step('Create invoice via API', async () => {
            const invoicePayload = buildInvoicePayload(cartId);

            const { response: invoiceResponse, body: invoiceBody } = await createInvoice(token, invoicePayload);

            expect(invoiceResponse.status()).toBe(201);
            expect(invoiceResponse.ok()).toBeTruthy();
            expect(invoiceBody.id).toBeTruthy();
            expect(invoiceBody.invoice_number).toBeTruthy();
        });
    });
});