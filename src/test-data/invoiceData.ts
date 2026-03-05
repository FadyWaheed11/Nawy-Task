export function buildInvoicePayload(cartId: string) {
    return {
        billing_street: '45 Oraby st',
        billing_city: 'Zayed',
        billing_state: 'Giza',
        billing_country: 'Egypt',
        billing_postal_code: '12655',
        payment_method: 'cash-on-delivery',
        payment_details: {},
        cart_id: cartId,
    };
}