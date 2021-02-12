![alpha](https://img.shields.io/badge/Status-Alpha-yellow.svg)

# Stripe Connector

> Stripe Connector for Open Integration Hub.

## Actions

## Triggers

### getCustomer
This trigger will get all customers from the associated Stripe account and pass them forward. Currently, the snapshot behaviour only looks at creation date. This means that changes made to an existing customer after it has been processed by this trigger will not be recognised. Newly created/added customers will be processed as normal. 

## Integrated Transformations

By default, this connector attempts to automatically transform data to and from the OIH Address Master Data model. If you would like to use your own transformation solution, simply set `skipTransformation: true` in the `fields` object of your flow configuration. Alternatively, you can also inject a valid, stringified JSONata expression in the `customMapping` key of the `fields` object, which will be used instead of the integrated transformation.
