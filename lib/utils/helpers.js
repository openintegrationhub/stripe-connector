const Stripe = require('stripe');

/**
 * This method fetches objects from Snazzy Contacts
 * depending on the value of count variable and type
 *
 * @param token - Snazzy Contacts token required for authentication
 * @param snapshot - current state of snapshot
 * @return {Object} - Array of person objects containing data and meta
 */
async function getCustomers(token, snapshot) {
  try {
    const stripe = new Stripe(token);
    let entries = [];

    entries = await stripe.customers
      .list({ created: { gt: snapshot.lastCreated } })
      .autoPagingToArray({ limit: 100 });


    return entries;
  } catch (e) {
    console.error(e);
    return [];
  }
}


module.exports = { getCustomers };
