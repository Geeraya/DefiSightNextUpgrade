# Tracking Service

This is the Tracking service of the DefiSight application. Users connected to the DefiSight client will be able to add/remove wallets that will be tracked on this service.

## Process:

- Initial set-up:
  - Fetch the tracked wallets from the application, which fetches them from the PostgreSQL database.
  - Fetch the balances of all tracked wallets.
  - Initialise the event listeners to listen to new blocks.
- On every block emitted, check every balance on a tracked wallet and if a balance is different from a stored value, make a request to a chain scanner to fetch transactions made by that wallet. Send the transaction notification to the Notification service.
- Add new wallets when requests are received from the DefiSight application.

## TODO:
