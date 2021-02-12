/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const { customerToOih } = require('../lib/transformations/customerToOih');

describe('transformations', () => {
  it('should transform a customer to the oih schema', async () => {
    const customer = {
      email: 'test@best.de',
      description: null,
      preferred_locales: [],
      name: 'Test User',
      invoice_prefix: '3C239AD1',
      shipping: null,
      address: {
        line1: 'Teststreet',
        line2: '42',
        country: 'DE',
        postal_code: '12345',
        city: 'TestCity',
        state: 'TestState',
      },
      metadata: {},
      invoice_settings: {
        footer: null,
        default_payment_method: 'pm_1HJx1QLATGODasEbznf6JLv6',
        custom_fields: null,
      },
      discount: null,
      tax_exempt: 'none',
      sources: {
        data: [],
        object: 'list',
        has_more: false,
        total_count: 0,
        url: '/v1/customers/cus_HtkWloLHA7yhXH/sources',
      },
      object: 'customer',
      id: 'cus_HtkWloLHA7yhXT',
      livemode: false,
      currency: 'eur',
      balance: 0,
      delinquent: false,
      created: 1598342209,
      phone: '1234/56789',
    };

    const expected = {
      metadata: {
        recordUid: 'cus_HtkWloLHA7yhXT',
      },
      data: {
        firstName: 'Test',
        lastName: 'User',
        contactData: [
          {
            type: 'email',
            value: 'test@best.de',
          },
          {
            type: 'phone',
            value: '1234/56789',
          },
        ],
        addresses: [
          {
            street: 'Teststreet',
            streetNumber: '42',
            country: 'DE',
            city: 'TestCity',
            state: 'TestState',
            zipcode: '12345',
          },
        ],
      },
    };

    const transformedElement = customerToOih(customer);

    expect(transformedElement).to.deep.equal(expected);
  });
});
