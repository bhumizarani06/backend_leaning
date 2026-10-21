\# T42 — MySQL Transactions and Concurrency



\## Objective

Implement safe order placement using MySQL transactions, stock validation, row locking, rollback, and bounded deadlock retries.



\## Technologies

\- Node.js

\- MySQL 8.0

\- mysql2

\- InnoDB



\## Main Files

\- `src/db.js` — MySQL connection pool

\- `src/test-connection.js` — Connection verification

\- `src/order.js` — Transaction-based order placement and bounded retry

\- `src/rollback-test.js` — Rollback demonstration

\- `src/race-test.js` — Concurrent buyer test



\## Transaction Flow

1\. Get a database connection.

2\. Begin a transaction.

3\. Lock the selected product row using `SELECT ... FOR UPDATE`.

4\. Validate product existence, quantity, and stock.

5\. Decrease stock using a conditional update.

6\. Insert the order and order item.

7\. Commit on success; rollback on failure.



\## Concurrency and Retry

\- Row locking prevents concurrent transactions from purchasing the same remaining stock.

\- Stock updates include a stock condition.

\- The bounded retry wrapper retries deadlock errors up to three attempts.

\- Business errors such as insufficient stock are not retried.



\## Commands



Check JavaScript syntax:



```powershell

node --check .\\src\\order.js

```



Verify exported functions:



```powershell

node -e "const order = require('./src/order'); console.log(Object.keys(order))"

```



Test the database connection:



```powershell

node .\\src\\test-connection.js

```



\## Verified Results

\- Database connection succeeded.

\- An intentional transaction error was rolled back; stock and order counts were unchanged by that test.

\- The race test resulted in one committed order for Race Test Product (product ID 4), quantity 1.

\- Product ID 4 stock decreased from 1 to 0.

\- The order item was verified in MySQL.



\## Safety Notes

\- Existing database records must not be deleted or reset during verification.

\- Race tests should only be run when the selected test product has sufficient stock.

\- Retry only safe, transient errors such as deadlocks. Production systems also need idempotency handling for uncertain commit outcomes.



