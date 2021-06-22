/* eslint prefer-destructuring: "off" */

module.exports.customerToOih = (msg) => {
  if (Object.keys(msg).length === 0 && msg.constructor === Object) {
    return msg;
  }

  let firstName = '';
  let lastName = '';

  if (msg.name) {
    const names = msg.name.split(' ');

    if (names.length > 1) {
      firstName = names[0];
      names.shift();
      lastName = names.join(' ');
    } else {
      lastName = names[0];
    }
  }

  const expression = {
    metadata: {
      recordUid: msg.id,
    },
    data: {
      firstName,
      lastName,
      contactData: [],
      addresses: [],
    },
  };

  if (msg.address) {
    const address = {
      city: msg.address.city,
      country: msg.address.country,
      street: msg.address.line1,
      streetNumber: msg.address.line2,
      state: msg.address.state,
      zipcode: msg.address.postal_code,
    };

    const hasAddressValue = Object.values(address).some(x => (x && x !== ''));

    if (hasAddressValue) expression.data.addresses.push(address);
  }

  if (msg.email) {
    expression.data.contactData.push({
      type: 'email',
      value: msg.email,
    });
  }

  if (msg.phone) {
    expression.data.contactData.push({
      type: 'phone',
      value: msg.phone,
    });
  }

  // Remove null values
  Object.keys(expression.data).forEach(
    key => (expression.data[key] == null || expression.data[key] === undefined)
      && delete expression.data[key],
  );

  return expression;
};
