# ShopLedger contributor guide

## Stack and commands

- Node.js with Express and `body-parser`; no build step.
- Start the application with `npm start`.
- Run tests with `node --test`.

## Module map

- `server.js` configures Express, static files, and the API routes.
- `routes/` translates HTTP requests into calls to the domain modules.
- `lib/` contains pricing, tax, invoice, inventory, orders, ledger, report, date, coupon, and JSON-store logic.
- `config.js` holds the shop configuration, GST slabs, and coupon rules.
- `data/db.json` is the tracked JSON data store.

## Rules

1. Write characterization tests before changing behaviour.
2. Change only the module involved in the ticket.
3. Tests must never touch `data/db.json`; use in-memory data.
4. Add no dependencies.

