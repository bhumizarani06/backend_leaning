# T40 - SQL Reporting with MySQL and Node.js

## Objective
Practice SQL reporting using MySQL and execute a customer spending report through Node.js.

## Technologies
- MySQL
- Node.js
- mysql2

## Project Structure
- `sql/reports.sql` - SQL reporting queries
- `src/db.js` - MySQL connection configuration
- `src/test-connection.js` - Database connection test
- `src/customer-report.js` - Customer spending report
- `package.json` - Project configuration and npm scripts

## Setup
1. Create the `t40_reporting` database and required tables in MySQL.
2. Install dependencies:

   `npm install`

3. Configure the MySQL connection in `src/db.js` with your local credentials.

## Run
Test the database connection:

`npm run db:test`

Run the customer spending report:

`npm run report`

Execute SQL reports from the MySQL client using the `SOURCE` command with the path to `sql/reports.sql`.

## SQL Concepts Practiced
- INNER JOIN and LEFT JOIN
- GROUP BY and HAVING
- COUNT, SUM, AVG, MIN and MAX
- CASE WHEN and COALESCE
- Date filtering, DISTINCT, LIMIT and OFFSET
- Views and transactions
