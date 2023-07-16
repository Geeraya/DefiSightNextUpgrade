## TODO's:

- Create wallet-tracker service:

  1. Connect service to database.
  2. Add functions to get, post, put and delete wallets.
  3. Create connections to various chain scanners.
  4. Get providers to interact with various chains.
  5. Create initialisation functionality:
     1. Get all the wallets to track from the database, keep them.
     2. Get all the balances of the wallets, keep them.
  6. Create tracking functionality:
     1. For every chain create a listener.
     2. On every new block check if default chain balance of that wallet has changed.
  7. Update wallet router to interact with fetched wallets and balances, so that the service can function indefinitely.
  8. **Error handling!**

- Create notification functionality:
  1. Create a notification service:
     1. TODO: Requirements and possibilities.
  2. Create a notification UI on the frontend.
  3. Connect next frontend and notification service.
  4. Connect wallet-tracker service and notification service.
